import { NextRequest, NextResponse } from "next/server";
import { promises as dns } from "node:dns";

const clean = (value = "") =>
  value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const attribute = (tag: string, name: string) =>
  new RegExp(`${name}\\s*=\\s*["']([^"']*)["']`, "i").exec(tag)?.[1] ?? "";

function meta(html: string, key: string) {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    const name = attribute(tag, "property") || attribute(tag, "name");
    if (name.toLowerCase() === key.toLowerCase())
      return attribute(tag, "content");
  }
  return "";
}

function pageData(html: string, url: string) {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  const allMeta = Object.fromEntries(
    tags
      .map((tag) => [
        attribute(tag, "property") ||
          attribute(tag, "name") ||
          attribute(tag, "http-equiv"),
        attribute(tag, "content"),
      ])
      .filter(([key]) => key),
  );

  const title = clean(
    meta(html, "og:title") ||
      /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1] ||
      "Untitled page",
  );

  const description = clean(
    meta(html, "og:description") || meta(html, "description"),
  );

  const image = meta(html, "og:image");

  return {
    url,
    title,
    description: description || "No meta description was found for this page.",
    image: image ? new URL(image, url).toString() : "",
    siteName: meta(html, "og:site_name") || new URL(url).hostname,
    type: meta(html, "og:type") || "website",
    canonical: /<link\b[^>]*rel=["']canonical["'][^>]*>/i.exec(html)?.[0]
      ? attribute(
          /<link\b[^>]*rel=["']canonical["'][^>]*>/i.exec(html)?.[0] ?? "",
          "href",
        )
      : "",
    meta: {
      title,
      description: meta(html, "description"),
      robots: meta(html, "robots"),
      viewport: meta(html, "viewport"),
      ogTitle: meta(html, "og:title"),
      ogDescription: meta(html, "og:description"),
      ogImage: image,
      twitterCard: meta(html, "twitter:card"),
      all: allMeta,
    },
  };
}

function safeUrl(raw: string) {
  const url = new URL(raw);
  if (!/^https?:$/.test(url.protocol))
    throw new Error("Use a valid http or https URL.");

  if (["localhost", "127.0.0.1", "::1"].includes(url.hostname))
    throw new Error("Local addresses cannot be checked.");

  return url;
}

export async function GET(request: NextRequest) {
  try {
    const type = request.nextUrl.searchParams.get("type");
    const value = request.nextUrl.searchParams.get("value")?.trim() ?? "";
    if (!value) throw new Error("Enter a value to continue.");

    if (type === "dns") {
      const domain = value.replace(/^https?:\/\//, "").split("/")[0];
      const [A, AAAA, MX, TXT, CNAME, NS] = await Promise.allSettled([
        dns.resolve4(domain),
        dns.resolve6(domain),
        dns.resolveMx(domain),
        dns.resolveTxt(domain),
        dns.resolveCname(domain),
        dns.resolveNs(domain),
      ]);

      const result = (item: PromiseSettledResult<unknown>) =>
        item.status === "fulfilled" ? item.value : [];

      return NextResponse.json({
        domain,
        records: {
          A: result(A),
          AAAA: result(AAAA),
          MX: result(MX),
          TXT: result(TXT),
          CNAME: result(CNAME),
          NS: result(NS),
        },
      });
    }

    if (type === "ip") {
      const response = await fetch(
        `https://ipwho.is/${encodeURIComponent(value)}`,
        { cache: "no-store" },
      );
      const data = await response.json();

      if (!data.success)
        throw new Error(data.message || "IP address was not found.");

      return NextResponse.json({
        ip: data.ip,
        country: data.country,
        region: data.region,
        city: data.city,
        continent: data.continent,
        timezone: data.timezone?.id,
        isp: data.connection?.isp,
        org: data.connection?.org,
        asn: data.connection?.asn,
      });
    }

    const url = safeUrl(value);
    const response = await fetch(url, {
      redirect: "follow",
      cache: "no-store",
      headers: { "user-agent": "Mozilla/5.0 (compatible; MelvinTools/1.0)" },
    });

    if (type === "headers")
      return NextResponse.json({
        url: response.url,
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
      });

    if (type === "redirect")
      return NextResponse.json({
        input: url.toString(),
        finalUrl: response.url,
        status: response.status,
        redirected: response.redirected,
      });

    const html = await response.text();
    return NextResponse.json(pageData(html, response.url));
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "The check could not be completed.",
      },
      { status: 400 },
    );
  }
}
