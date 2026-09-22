import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faCloudflare,
  faFacebookF,
  faFirefoxBrowser,
  faGoogle,
  faInternetExplorer,
  faJava,
  faNodeJs,
  faQq,
  faSafari,
  faWordpress,
} from "@fortawesome/free-brands-svg-icons";

export type Tool = {
  path: string;
  name: string;
  icon: IconDefinition;
  category: string;
  shortDescription: string;
  description: string;
  keywords: string;
  inputLabel: string;
  placeholder: string;
  mode: "text" | "url" | "dns" | "json" | "base64" | "qr" | "headers" | "html";
  external?: boolean;
};

export const toolGroups: { name: string; tools: Tool[] }[] = [
  {
    name: "SEO & web",
    tools: [
      {
        path: "/seo/opengraph",
        name: "Open Graph Preview",
        icon: faFacebookF,
        category: "SEO",
        shortDescription: "Preview social cards before you share.",
        description:
          "Check how a page’s Open Graph metadata may appear when shared on social networks and messaging apps.",
        keywords: "Open Graph preview, social media preview, OG tags checker",
        inputLabel: "Page URL",
        placeholder: "https://example.com/article",
        mode: "url",
      },
      {
        path: "/seo/meta-tags",
        name: "Meta Tag Checker",
        icon: faGoogle,
        category: "SEO",
        shortDescription: "Review titles, descriptions, and tags.",
        description:
          "Inspect essential page metadata and make sure search engines receive a clear, useful summary of your content.",
        keywords: "meta tag checker, SEO title checker, meta description tool",
        inputLabel: "Page URL",
        placeholder: "https://example.com",
        mode: "url",
      },
      {
        path: "/url/redirect-checker",
        name: "Redirect Checker",
        icon: faSafari,
        category: "URL",
        shortDescription: "Follow a URL’s redirect path.",
        description:
          "Check a URL’s redirect chain and identify the final destination before linking, migrating, or troubleshooting.",
        keywords: "redirect checker, URL redirect chain, HTTP redirect test",
        inputLabel: "URL to check",
        placeholder: "https://example.com/old-page",
        mode: "url",
      },
    ],
  },
  {
    name: "Network & security",
    tools: [
      {
        path: "/network/ip",
        name: "IP Address Lookup",
        icon: faInternetExplorer,
        category: "Network",
        shortDescription: "Find details about an IP address.",
        description:
          "Look up the public details associated with an IPv4 or IPv6 address for quick network troubleshooting.",
        keywords: "IP address lookup, IP information, what is my IP",
        inputLabel: "IP address",
        placeholder: "8.8.8.8",
        mode: "text",
      },
      {
        path: "/network/dns",
        name: "DNS Lookup",
        icon: faCloudflare,
        category: "Network",
        shortDescription: "Inspect common DNS records.",
        description:
          "Query common DNS record types to help verify domains, mail settings, and website configuration.",
        keywords: "DNS lookup, DNS record checker, domain DNS tool",
        inputLabel: "Domain name",
        placeholder: "example.com",
        mode: "dns",
      },
      {
        path: "/security/headers",
        name: "Security Headers",
        icon: faFirefoxBrowser,
        category: "Security",
        shortDescription: "Review important HTTP response headers.",
        description:
          "Review security-focused HTTP response headers and get a quick indication of your site’s browser protections.",
        keywords:
          "security headers checker, HTTP headers, website security test",
        inputLabel: "Website URL",
        placeholder: "https://example.com",
        mode: "headers",
      },
    ],
  },
  {
    name: "Developer essentials",
    tools: [
      {
        path: "/qr",
        name: "QR Code Generator",
        icon: faQq,
        category: "Utility",
        shortDescription: "Create a clean QR code from text or a link.",
        description:
          "Generate a scannable QR code for a URL, contact detail, Wi-Fi credential, or short piece of text.",
        keywords: "QR code generator, create QR code, URL QR code",
        inputLabel: "Text or URL",
        placeholder: "https://example.com",
        mode: "qr",
      },
      {
        path: "/dev/json",
        name: "JSON Formatter",
        icon: faNodeJs,
        category: "Developer",
        shortDescription: "Format, validate, and tidy JSON.",
        description:
          "Format and validate JSON instantly so API responses, configuration files, and data structures are easier to read.",
        keywords: "JSON formatter, JSON validator, prettify JSON",
        inputLabel: "Paste JSON",
        placeholder: '{ "hello": "world" }',
        mode: "json",
      },
      {
        path: "/dev/base64",
        name: "Base64 Encoder",
        icon: faJava,
        category: "Developer",
        shortDescription: "Encode or decode Base64 text.",
        description:
          "Convert text to Base64 or decode Base64 values directly in your browser for quick development tasks.",
        keywords: "Base64 encoder, Base64 decoder, encode text Base64",
        inputLabel: "Text or Base64 value",
        placeholder: "Type or paste something here",
        mode: "base64",
      },
      {
        path: "/dev/html-editor",
        name: "HTML Editor",
        icon: faWordpress,
        category: "Developer",
        shortDescription: "Edit HTML and preview changes as you type.",
        description:
          "Write, debug, and preview HTML in a split-screen editor designed for quick website and WordPress troubleshooting.",
        keywords: "HTML editor, live HTML preview, WordPress HTML debugger",
        inputLabel: "HTML source",
        placeholder: "<h1>Hello world</h1>",
        mode: "html",
      },
    ],
  },
  {
    name: "Third-party tools",
    tools: [
      {
        path: "https://securityheaders.com/",
        external: true,
        name: "SecurityHeaders.com",
        icon: faFirefoxBrowser,
        category: "Security",
        shortDescription: "Grade your website’s security response headers.",
        description:
          "An external service for checking common website security headers.",
        keywords: "security headers checker",
        inputLabel: "Website URL",
        placeholder: "https://example.com",
        mode: "headers",
      },
      {
        path: "https://websitecarbon.com/",
        external: true,
        name: "Website Carbon",
        icon: faCloudflare,
        category: "Sustainability",
        shortDescription: "Estimate the carbon impact of a web page.",
        description:
          "An external service for estimating website carbon emissions.",
        keywords: "website carbon checker",
        inputLabel: "Website URL",
        placeholder: "https://example.com",
        mode: "url",
      },
      {
        path: "https://validator.schema.org/",
        external: true,
        name: "Schema Markup Validator",
        icon: faGoogle,
        category: "SEO",
        shortDescription: "Validate structured data and schema markup.",
        description:
          "Google’s Schema Markup Validator for testing structured data.",
        keywords: "schema markup validator, structured data test",
        inputLabel: "Page URL or code",
        placeholder: "https://example.com",
        mode: "url",
      },
    ],
  },
];

export const allTools = toolGroups
  .flatMap((group) => group.tools)
  .filter((tool) => !tool.external);

export const findTool = (path: string) =>
  allTools.find((tool) => tool.path === path);
