// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PrelineInitializer from "@/components/PrelineInitializer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Agency Tailwind CSS Template | Preline UI, crafted with Tailwind CSS",
  description:
    "Crafted for agencies and studios specializing in web design and development.",
  robots: "max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  metadataBase: new URL("https://preline.co"),
  alternates: {
    canonical: "/",
  },
  twitter: {
    card: "summary_large_image",
    site: "@preline",
    creator: "@preline",
    title:
      "Agency Tailwind CSS Template | Preline UI, crafted with Tailwind CSS",
    description:
      "Crafted for agencies and studios specializing in web design and development.",
    images: ["/assets/img/og-image.png"],
  },
  openGraph: {
    title:
      "Agency Tailwind CSS Template | Preline UI, crafted with Tailwind CSS",
    description:
      "Crafted for agencies and studios specializing in web design and development.",
    url: "/",
    siteName: "Preline",
    images: [{ url: "/assets/img/og-image.png" }],
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const InitialThemeScript = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `
(function() {
  const html = document.documentElement;
  const storedTheme = localStorage.getItem('hs_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isLight = storedTheme === 'light' || (!storedTheme && !prefersDark) || (storedTheme === 'auto' && !prefersDark);
  const isDark = storedTheme === 'dark' || (!storedTheme && prefersDark) || (storedTheme === 'auto' && prefersDark);
  html.classList.remove('light', 'dark');
  if (isDark) { html.classList.add('dark'); }
  else { html.classList.add('light'); }
})();
`,
    }}
  />
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Add suppressHydrationWarning here
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <InitialThemeScript />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-neutral-900`}>
        <Header />
        {children}
        <Footer />
        <PrelineInitializer />
      </body>
    </html>
  );
}
