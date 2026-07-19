import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Set Up Auto-Publishing",
  description:
    "Connect WordPress, Discord, or your own website/CMS so finished articles publish automatically — includes a copy-paste AI prompt for custom sites.",
  alternates: { canonical: "/docs/autopublish" },
};

export default function AutopublishDocsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
