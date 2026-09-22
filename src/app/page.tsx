import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toolGroups } from "./tool-data";

export default function Home() {
  return (
    <main className="text-[#10251c]">
      <section className="mx-auto grid w-[min(1120px,calc(100%-48px))] items-center gap-14 py-24 lg:grid-cols-[1.15fr_.85fr] lg:py-32">
        <div>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[.95] tracking-[-.045em] sm:text-7xl">
            Useful tools, kept refreshingly simple.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-7 text-[#5d6d64]">
            A practical collection of privacy-minded tools for SEO checks,
            network lookups, developers, and everyday web work.
          </p>
          <a
            className="mt-8 inline-flex items-center gap-6 rounded bg-[#127a43] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#0d6135]"
            href="#tools"
          >
            Explore the tools <span>↓</span>
          </a>
        </div>

        <aside
          className="border border-[#bfd4c5] bg-[#f4f8f5] p-3 shadow-[10px_10px_0_#dce7df]"
          aria-label="Tools overview"
        >
          <div className="flex items-center justify-between border-b border-[#cfe0d3] px-3 py-3 text-[11px] font-bold uppercase tracking-[.14em] text-[#52715b]">
            <span>Tool desk</span>
            <span className="size-2 rounded-full bg-[#127a43]" />
          </div>
          <div className="grid grid-cols-2 gap-3 p-3">
            <div className="col-span-2 border border-[#cfe0d3] bg-white p-4">
              <p className="text-[11px] font-bold uppercase tracking-[.12em] text-[#5d6d64]">
                Today&apos;s utility
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-[-.04em]">
                Check before publish
              </p>
              <div className="mt-4 flex gap-1">
                <i className="h-1.5 w-20 bg-[#127a43]" />
                <i className="h-1.5 w-10 bg-[#a8cdb1]" />
                <i className="h-1.5 w-6 bg-[#dce7df]" />
              </div>
            </div>
            <div className="border border-[#cfe0d3] bg-white p-4">
              <p className="text-2xl font-semibold text-[#127a43]">09</p>
              <p className="mt-1 text-xs leading-4 text-[#5d6d64]">
                practical tools
                <br />
                in one place
              </p>
            </div>
            <div className="border border-[#cfe0d3] bg-[#127a43] p-4 text-white">
              <p className="text-2xl font-semibold">1 min</p>
              <p className="mt-1 text-xs leading-4 text-[#d9f1df]">
                from question
                <br />
                to answer
              </p>
            </div>
            <div className="col-span-2 flex items-center justify-between border border-[#cfe0d3] bg-white px-4 py-3">
              <span className="text-sm font-semibold">SEO · Network · Dev</span>
              <span className="text-[#127a43]">↗</span>
            </div>
          </div>
        </aside>
      </section>

      <section id="tools" className="border-t border-[#dce7df] py-20">
        <div className="mx-auto w-[min(1120px,calc(100%-48px))]">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-4xl font-semibold leading-none tracking-[-.045em] sm:text-5xl">
                Pick up where your work starts
              </h2>
            </div>
            <p className="max-w-xs leading-6 text-[#5d6d64]">
              Built for quick answers, clear outputs, and fewer open tabs.
            </p>
          </div>
          {toolGroups.map((group) => (
            <div className="mt-14" key={group.name}>
              <h3 className="mb-3 text-lg font-semibold tracking-[-.02em] text-[#5d6d64]">
                {group.name}
              </h3>
              <div className="grid border border-[#dce7df] md:grid-cols-3">
                {group.tools.map((tool) => (
                  <Link
                    href={tool.path}
                    target={tool.external ? "_blank" : undefined}
                    rel={tool.external ? "noreferrer" : undefined}
                    className="relative min-h-48 border-b border-[#dce7df] p-6 transition hover:bg-[#f4f8f5] last:border-b-0 md:border-r md:border-b-0 md:last:border-r-0"
                    key={tool.path}
                  >
                    <span className="mb-7 grid size-9 place-items-center rounded-full bg-[#e1f0e6] text-sm font-bold text-[#0d6135]">
                      <FontAwesomeIcon icon={tool.icon} />
                    </span>
                    <h3 className="text-xl font-semibold tracking-[-.04em]">
                      {tool.name}
                    </h3>
                    <p className="mt-2 max-w-60 text-sm leading-5 text-[#5d6d64]">
                      {tool.shortDescription}
                    </p>
                    <span className="absolute right-5 bottom-4 text-xl text-[#127a43]">
                      {tool.external ? "↗" : "→"}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-[#dce7df] bg-[#f4f8f5] py-20 sm:py-24">
        <div className="mx-auto w-[min(1120px,calc(100%-48px))]">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
            <div>
              <h2 className="max-w-md text-4xl font-semibold leading-none tracking-[-.045em] sm:text-5xl">
                Small utilities. No unnecessary noise.
              </h2>
            </div>
            <p className="max-w-lg text-lg leading-7 text-[#5d6d64]">
              Tools by Melvin Jones Repol for the moments when you need a
              reliable answer without a complicated platform.
            </p>
          </div>
          <div className="mt-14 grid border border-[#cfe0d3] bg-white md:grid-cols-3">
            <div className="border-b border-[#dce7df] p-6 md:border-r md:border-b-0">
              <h3 className="text-xl font-semibold tracking-[-.04em]">
                Start with clarity
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#5d6d64]">
                Each tool has one job, a focused input, and an output you can
                use right away.
              </p>
            </div>
            <div className="border-b border-[#dce7df] p-6 md:border-r md:border-b-0">
              <h3 className="text-xl font-semibold tracking-[-.04em]">
                Keep moving
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#5d6d64]">
                No account walls or sprawling dashboards between a quick check
                and your next step.
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold tracking-[-.04em]">
                Use good judgment
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#5d6d64]">
                Practical results for everyday work, with enough context to help
                you verify important decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(1120px,calc(100%-48px))] py-20 sm:py-24">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-semibold leading-none tracking-[-.045em] sm:text-5xl">
            Common search and website questions, answered.
          </h2>
          <p className="mt-5 text-lg leading-7 text-[#5d6d64]">
            Practical guidance for the issues people most often encounter while
            publishing, optimizing, and troubleshooting a website.
          </p>
        </div>
        <div className="mt-12 border-t border-[#dce7df]">
          <Faq question="Why is my website not appearing on Google?">
            New pages need to be discovered, crawled, and indexed before they
            can appear in results. Start by checking that the page is publicly
            accessible, is not blocked by robots.txt or a noindex tag, and has
            been submitted through Google Search Console. Internal links from
            already-indexed pages also help Google find new content.
          </Faq>
          <Faq question="Why does Google show the wrong title or description?">
            Google can rewrite title links and snippets when it believes another
            version better matches a search. Use a descriptive title, write a
            concise meta description, keep the on-page heading aligned with
            both, and avoid duplicate or vague metadata across pages. The Meta
            Tag Checker helps you confirm what your page is currently sending.
          </Faq>
          <Faq question="How do I fix a broken Open Graph or social sharing preview?">
            Check that og:title, og:description, og:image, and og:url are
            present in the page source. Your image should be publicly reachable,
            ideally 1200 by 630 pixels, and use a stable absolute URL. Platforms
            cache previews, so use each platform’s sharing debugger after making
            changes.
          </Faq>
          <Faq question="What is the difference between a 301 and a 302 redirect?">
            A 301 is a permanent redirect and normally signals that search
            engines should transfer relevance to the new URL. A 302 is temporary
            and suggests that the original URL may return. Use a 301 for a
            permanent page move, then check the path to make sure there is no
            unnecessary redirect chain.
          </Faq>
          <Faq question="How can I improve a page that is indexed but does not rank?">
            Make the page genuinely useful for the searcher’s intent, use a
            clear page title and heading, add details your competitors have
            missed, and link to it from relevant pages on your site. Rankings
            also depend on topical authority, technical quality, and external
            signals, so improvements can take time to show results.
          </Faq>
          <Faq question="How do I create a Google Knowledge Panel?">
            You cannot directly create or pay for a Knowledge Panel. Google
            generates them when it has enough confidence in a notable person,
            organization, place, or entity. Build consistent public information
            across your official site, reputable profiles, structured data, and
            credible independent sources. If one already exists, Google may
            offer a verification process for eligible entities.
          </Faq>
          <Faq question="Do meta keywords still help SEO?">
            No. Major search engines do not use the meta keywords tag as a
            ranking signal. Spend that effort on an accurate title, a helpful
            meta description, clear content, and internal links that make the
            topic and page purpose easy to understand.
          </Faq>
          <Faq question="What security headers should a website have?">
            Common headers include Content-Security-Policy,
            Strict-Transport-Security, X-Content-Type-Options, Referrer-Policy,
            and a sensible Permissions-Policy. The right configuration depends
            on how your website loads scripts, embeds, and third-party services,
            so test carefully before deploying a strict policy.
          </Faq>
        </div>
      </section>

      <footer className="border-t border-[#dce7df] bg-[#f4f8f5]">
        <div className="mx-auto flex w-[min(1120px,calc(100%-48px))] flex-col justify-between gap-6 py-7 sm:flex-row sm:items-center">
          <p className="text-sm text-[#5d6d64]">tools.melvinjonesrepol.com</p>
          <a
            className="inline-flex w-fit items-center gap-4 rounded bg-[#127a43] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0d6135]"
            href="#tools"
          >
            Browse all tools <span>↑</span>
          </a>
          <p className="text-sm text-[#5d6d64]">Built by Melvin Jones Repol</p>
        </div>
      </footer>
    </main>
  );
}

function Faq({
  question,
  children,
}: {
  question: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group border-b border-[#dce7df] py-5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold tracking-[-.02em]">
        <span>{question}</span>
        <span className="text-xl font-normal text-[#127a43] group-open:hidden">
          +
        </span>
        <span className="hidden text-xl font-normal text-[#127a43] group-open:block">
          −
        </span>
      </summary>
      <p className="max-w-3xl pt-4 leading-7 text-[#5d6d64]">{children}</p>
    </details>
  );
}
