// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PrelineInitializer from "@/components/PrelineInitializer";
import { PostHogProvider } from "@/components/PostHogProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zynex Solutions",
  description: "Discover the Smart Way to Build a Custom Ecommerce Store.",
  robots: "max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  metadataBase: new URL("https://preline.co"),
  alternates: {
    canonical: "/",
  },
  twitter: {
    card: "summary_large_image",
    site: "@preline",
    creator: "@preline",
    title: "Zynex Solutions",
    description: "Discover the Smart Way to Build a Custom Ecommerce Store.",
    images: ["/assets/img/og-image.png"],
  },
  openGraph: {
    title: "Zynex Solutions",
    description: "Discover the Smart Way to Build a Custom Ecommerce Store.",
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
`
    }}
  />
);

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // Add suppressHydrationWarning here
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-X7785CM8JM"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-X7785CM8JM');
            `
          }}
        />
        <InitialThemeScript />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1214189476768948');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            alt="fbpx"
            src="https://www.facebook.com/tr?id=1948143092656196&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}

      </head>
      <body className={`${inter.className} bg-neutral-900`}>
        <PostHogProvider>
          <Header />
          {children}
          <Footer />
          <PrelineInitializer />
        </PostHogProvider>
      </body>
    </html>
  );
}
