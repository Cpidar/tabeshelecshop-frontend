import "@/styles/globals.css"
// import "@/styles/index.scss"
import "@glidejs/glide/dist/css/glide.core.min.css"
import "rc-slider/assets/index.css"
import { Metadata } from "next"
import HolyLoader from "holy-loader"
import { IRANSans } from "@/styles/font"
import { getBaseURL } from "@lib/util/env"
import { getSettings } from "@/Globals/Settings/Component"
import { InitTheme } from "@/providers/Theme/InitTheme"
import Script from "next/script"
import Favicon from "@/components/Favicon"
import { Providers } from "@/providers"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"
const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()

  return {
    metadataBase: new URL(getBaseURL()),
    title: {
      default: settings.siteTitle!,
      template: `%s | ${settings.siteTitle}`,
    },
    robots: {
      follow: true,
      index: true,
    },
  }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const settings = await getSettings()

  return (
    <html
      lang="fa"
      dir="rtl"
      className={IRANSans.variable}
      suppressHydrationWarning
    >
      <head>
        <InitTheme />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest"></link>
        <Favicon head />

        {/* ✅ Google Analytics for Search Console verification */}
        {settings.googleAnalytics && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${settings.googleAnalytics}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${settings.googleAnalytics}');
                `,
              }}
            />
          </>
        )}

        {/* ✅ Google Tag Manager */}
        {settings.googleTag && (
          <Script id="gtm-init" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${settings.googleTag}');
            `}
          </Script>
        )}

        {/* ✅ Facebook Pixel */}
        {settings.facebookPixel && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s) {
                    if(f.fbq)return; n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n; n.push=n; n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '${settings.facebookPixel}');
                    fbq('track', 'PageView');
                `,
              }}
            />
          </>
        )}
      </head>
      <HolyLoader color="#ff4500" speed={250} easing="linear" showSpinner />
      <body className="bg-background text-base text-foreground">
        <Providers>{props.children}</Providers>
      </body>
    </html>
  )
}
