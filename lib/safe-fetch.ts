import dns from "dns/promises";
import net from "net";

// SSRF guard for the site-crawling routes (/api/setup, /api/analyze), which
// fetch a user-supplied domain server-side with no auth on /api/analyze.
// Without this, a request could target localhost, an internal service, or a
// cloud metadata endpoint (169.254.169.254) instead of a real website.

const BLOCKED_HOSTNAMES = new Set(["localhost", "0.0.0.0", "::1", "[::1]"]);
const MAX_REDIRECTS = 5;

function isPrivateIp(ip: string): boolean {
  if (net.isIPv4(ip)) {
    const parts = ip.split(".").map(Number);
    const [a, b] = parts;
    if (parts.length !== 4 || parts.some((n) => Number.isNaN(n))) return true; // malformed — treat as unsafe
    return (
      a === 127 || // loopback
      a === 10 ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 169 && b === 254) // link-local, incl. the cloud metadata endpoint
    );
  }
  if (net.isIPv6(ip)) {
    const lower = ip.toLowerCase();
    return lower === "::1" || lower.startsWith("fc") || lower.startsWith("fd") || lower.startsWith("fe80");
  }
  return true; // not a recognizable IP — fail closed
}

async function assertPublicHost(url: URL): Promise<void> {
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Only http/https URLs are allowed");
  }
  const hostname = url.hostname.replace(/^\[|\]$/g, "");
  if (BLOCKED_HOSTNAMES.has(hostname.toLowerCase())) {
    throw new Error("This URL is not allowed");
  }
  if (net.isIP(hostname)) {
    if (isPrivateIp(hostname)) throw new Error("This URL is not allowed");
    return;
  }
  // Resolve DNS so a public-looking hostname that actually points at a
  // private/internal address (DNS rebinding) is also rejected.
  const records = await dns.lookup(hostname, { all: true, verbatim: true });
  if (records.length === 0 || records.some((r) => isPrivateIp(r.address))) {
    throw new Error("This URL is not allowed");
  }
}

// Drop-in replacement for `fetch` that validates the target (and every
// redirect hop — a malicious site could otherwise 302 to an internal address)
// isn't a private/internal/metadata address before the request is made.
export async function safeFetch(url: string, init?: RequestInit): Promise<Response> {
  let current = new URL(url);
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    await assertPublicHost(current);
    const res = await fetch(current, { ...init, redirect: "manual" });
    if (res.status >= 300 && res.status < 400 && res.headers.get("location")) {
      current = new URL(res.headers.get("location")!, current);
      continue;
    }
    return res;
  }
  throw new Error("Too many redirects");
}
