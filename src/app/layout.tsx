import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { AuthDialog } from "@/components/auth/AuthDialog";
import { AuthProvider } from "@/components/auth/AuthProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

const title = "TechCity Roadmaps — A path for every subject you study";
const description =
  "TechCity Roadmaps is for students. DSA, AIML, cloud, data, software, and security, each as one ordered path of problems. You always know the step you are on.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — TechCity Roadmaps",
  },
  description,
  applicationName: "TechCity Roadmaps",
  keywords: [
    "TechCity",
    "TechCity Roadmaps",
    "student roadmaps",
    "DSA",
    "data structures and algorithms",
    "AIML",
    "cloud",
    "data",
    "software",
    "security",
    "practice problems",
  ],
  authors: [{ name: "TechCity" }],
  creator: "TechCity",
  publisher: "TechCity",
  category: "education",
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png", type: "image/png" }],
    shortcut: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "TechCity Roadmaps",
    title,
    description,
    images: [
      {
        url: "/logo.png",
        width: 945,
        height: 921,
        alt: "TechCity logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: [
      {
        url: "/logo.png",
        alt: "TechCity logo",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#090b10" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){var theme="dark";try{var saved=localStorage.getItem("techcity-rm-theme");if(saved==="light"||saved==="dark")theme=saved}catch(e){}document.documentElement.dataset.theme=theme;var meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.setAttribute("content",theme==="light"?"#f7f8fb":"#090b10");function strip(node){if(!node||node.nodeType!==1)return;if(node.hasAttribute("data-cursor-ref"))node.removeAttribute("data-cursor-ref");var list=node.querySelectorAll("[data-cursor-ref]");for(var i=0;i<list.length;i++)list[i].removeAttribute("data-cursor-ref")}new MutationObserver(function(records){for(var i=0;i<records.length;i++){var rec=records[i];if(rec.type==="attributes")rec.target.removeAttribute("data-cursor-ref");var added=rec.addedNodes;for(var j=0;j<added.length;j++)strip(added[j])}}).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:["data-cursor-ref"]})})()`}
        </Script>
        <AuthProvider>
          {children}
          <AuthDialog />
        </AuthProvider>
      </body>
    </html>
  );
}
