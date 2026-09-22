import type { Metadata } from "next";
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Maven_Pro, Sora } from "next/font/google";

config.autoAddCss = false;

const mavenPro = Maven_Pro({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-body",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-heading",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tools.melvinjonesrepol.com"),
  title: "Free Online Web Tools and Utilities - Tools",
  description:
    "Simple, useful online tools for SEO, networks, security, and development.",
  authors: [
    { name: "Melvin Jones Repol", url: "https://www.melvinjonesrepol.com" },
  ],
  alternates: { canonical: "https://tools.melvinjonesrepol.com" },
  openGraph: {
    title: "Free Online Web Tools and Utilities - Tools",
    description:
      "Simple, useful online tools for SEO, networks, security, and development.",
    url: "https://tools.melvinjonesrepol.com",
    siteName: "Tools",
    images: [
      {
        url: "https://tools.melvinjonesrepol.com/images/melvinjonesrepol.cover.png",
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
    title: "Free Online Web Tools and Utilities - Tools",
    description:
      "Simple, useful online tools for SEO, networks, security, and development.",
    images: [
      "https://tools.melvinjonesrepol.com/images/melvinjonesrepol.cover.png",
    ],
    creator: "@mrepol742",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        url: "/favicon-32x32.png",
        sizes: "32x32",
      },
      {
        rel: "icon",
        url: "/favicon-16x16.png",
        sizes: "16x16",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${mavenPro.variable} ${sora.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <meta name="hostname" content="tools.melvinjonesrepol.com" />
      </head>
      <body className="antialiased min-h-full flex flex-col">{children}</body>
    </html>
  );
}
