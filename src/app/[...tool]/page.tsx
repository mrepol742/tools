import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { allTools, findTool } from "../tool-data";
import ToolWorkbench from "../tool-workbench";

const site = "https://tools.melvinjonesrepol.com";

export function generateStaticParams() {
  return allTools.map((item) => ({ tool: item.path.slice(1).split("/") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string[] }>;
}): Promise<Metadata> {
  const { tool } = await params;
  const item = findTool(`/${tool.join("/")}`);

  if (!item) return {};
  const url = `${site}${item.path}`;

  return {
    title: `${item.name} - Tools`,
    description: item.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${item.name} - Tools`,
      description: item.description,
      url,
      siteName: "Tools",
      images: [
        {
          url: `${site}/images/melvinjonesrepol.cover.png`,
          width: 1200,
          height: 630,
          alt: "tools.melvinjonesrepol.com",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.name} - Tools`,
      description: item.description,
      images: [`${site}/images/melvinjonesrepol.cover.png`],
      creator: "@mrepol742",
    },
    keywords: item.keywords,
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ tool: string[] }>;
}) {
  const { tool } = await params;
  const item = findTool(`/${tool.join("/")}`);
  if (!item) notFound();

  return (
    <main className="mx-auto w-[min(1120px,calc(100%-48px))] py-10 pb-24 text-[#10251c]">
      <Link
        href="/"
        className="text-sm text-[#5d6d64] transition hover:text-[#127a43]"
      >
        ← All tools
      </Link>
      <section className="max-w-2xl py-16">
        <h1 className="text-5xl font-semibold leading-[.95] tracking-[-.045em] sm:text-7xl">
          {item.name}
        </h1>
        <p className="mt-5 text-lg leading-7 text-[#5d6d64]">
          {item.description}
        </p>
      </section>
      <ToolWorkbench tool={item} />
      <section className="mt-20 max-w-3xl border-t border-[#dce7df] pt-14">
        <h2 className="mt-8 text-2xl font-semibold tracking-[-.04em]">
          About this {item.name.toLowerCase()}
        </h2>
        <p className="mt-3 leading-7 text-[#5d6d64]">
          {item.description} This free online tool is designed to give you a
          straightforward starting point without installing software or creating
          an account. Enter your information above and use the result to make a
          confident next decision.
        </p>
        <h2 className="mt-8 text-2xl font-semibold tracking-[-.04em]">
          When to use it
        </h2>
        <p className="mt-3 leading-7 text-[#5d6d64]">
          Use this tool while publishing a website, debugging a technical issue,
          reviewing a configuration, or checking a detail before you share it
          with someone else. Results are intended as a quick practical
          reference, so always confirm important production changes in the
          system that owns the data.
        </p>
      </section>
    </main>
  );
}
