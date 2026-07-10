"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BlogCover } from "./BlogCover";

export type BlogCard = {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  published_at: string | null;
  cover_image_url: string | null;
  readMinutes: number;
};

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function CardMeta({ post }: { post: BlogCard }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[var(--ink-faint)]">
      {post.tags[0] && <span className="font-semibold text-[var(--olive)]">{post.tags[0]}</span>}
      {post.tags[0] && <span aria-hidden="true">·</span>}
      <time dateTime={post.published_at ?? undefined}>{formatDate(post.published_at)}</time>
      <span aria-hidden="true">·</span>
      <span>{post.readMinutes} min read</span>
    </div>
  );
}

export function BlogIndex({ posts }: { posts: BlogCard[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of posts) for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([t]) => t);
  }, [posts]);

  const filtered = activeTag ? posts.filter((p) => p.tags.includes(activeTag)) : posts;
  // The featured (wide) treatment only applies to the latest post in the unfiltered view.
  const featured = activeTag ? undefined : filtered[0];
  const rest = activeTag ? filtered : filtered.slice(1);

  const chipCls = (active: boolean) =>
    `rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rust)] ${
      active
        ? "bg-[var(--rust)] text-[var(--surface)]"
        : "border border-[var(--line)] text-[var(--ink-soft)] hover:border-[var(--rust)]/40 hover:text-[var(--ink)]"
    }`;

  return (
    <div>
      {tags.length > 0 && (
        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter posts by topic">
          <button onClick={() => setActiveTag(null)} className={chipCls(activeTag === null)} aria-pressed={activeTag === null}>
            All posts
          </button>
          {tags.map((tag) => (
            <button key={tag} onClick={() => setActiveTag(tag)} className={chipCls(activeTag === tag)} aria-pressed={activeTag === tag}>
              {tag}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <p className="rounded-2xl border border-dashed border-[var(--line)] px-6 py-14 text-center text-sm text-[var(--ink-faint)]">
          Nothing under this topic yet.
        </p>
      )}

      {/* Featured: the latest post gets the wide, asymmetric treatment */}
      {featured && (
        <article className="mb-12">
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--rust)]/40 hover:shadow-[0_18px_40px_-24px_oklch(0.19_0.014_55/40%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rust)] md:grid-cols-[1.15fr_1fr]"
          >
            <BlogCover
              slug={featured.slug}
              coverImageUrl={featured.cover_image_url}
              title={featured.title}
              className="aspect-[16/9] md:aspect-auto md:min-h-[280px]"
            />
            <div className="flex flex-col justify-center gap-4 px-8 py-8 md:px-10">
              <CardMeta post={featured} />
              <h2
                className="font-signal-serif text-3xl font-[350] leading-snug tracking-tight text-[var(--ink)] transition-colors group-hover:text-[var(--rust-deep)] sm:text-4xl"
                style={{ textWrap: "balance" } as React.CSSProperties}
              >
                {featured.title}
              </h2>
              <p className="line-clamp-3 text-[15px] leading-relaxed text-[var(--ink-soft)]">{featured.description}</p>
              <span className="mt-1 text-sm font-semibold text-[var(--rust)]">Read the post →</span>
            </div>
          </Link>
        </article>
      )}

      {rest.length > 0 && (
        <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {rest.map((post) => (
            <article key={post.id} className="flex">
              <Link
                href={`/blog/${post.slug}`}
                className="group flex w-full flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--rust)]/40 hover:shadow-[0_14px_32px_-22px_oklch(0.19_0.014_55/40%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rust)]"
              >
                <BlogCover slug={post.slug} coverImageUrl={post.cover_image_url} title={post.title} className="aspect-[16/9]" />
                <div className="flex flex-1 flex-col gap-3 px-6 py-6">
                  <CardMeta post={post} />
                  <h2 className="font-signal-serif text-xl font-[350] leading-snug tracking-tight text-[var(--ink)] transition-colors group-hover:text-[var(--rust-deep)]">
                    {post.title}
                  </h2>
                  <p className="line-clamp-3 text-sm leading-relaxed text-[var(--ink-soft)]">{post.description}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
