import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "@/components/Footer";
import UmamiScript from "@/components/UmamiScript";
import "dotenv/config";
import { FOOTER_LINKS, HEADER_LINKS, url } from "@/utils/site.config";
import TailwindDebug from "@/components/TailwindDebug";

export const metadata: Metadata = {
  title: {
    default: "Julian Verwoerd | Software Developer Portfolio",
    template: "%s | Julian Verwoerd",
  },
  description:
    "Portfolio van Julian Verwoerd, software developer uit Nederland. Bekijk projecten in Next.js, Java, C#, .NET, Unity, Minecraft plugins en IoT met ESP32 en Arduino.",

  keywords: [
    "Julian Verwoerd",
    "software developer",
    "backend developer",
    "fullstack developer Nederland",
    "student software developer",
    "Veenendaal developer",

    "Next.js",
    "Node.js",
    "TypeScript",
    "JavaScript",
    "React",

    "C# developer",
    "WinForms",
    ".NET developer",
    "Java developer",
    "Python developer",
    "PHP developer",

    "Unity game developer",
    "C++ developer",
    "Lua scripting",

    "Arduino projecten",
    "ESP32 MQTT",
    "Home Assistant sensor",
    "IoT development",
    "embedded systems",

    "MySQL",
    "PostgreSQL",
    "SQL",

    "Minecraft plugin developer",
    "PaperMC plugin",
    "game development Nederland",
    "software portfolio",
  ],

  category: "Technology",
  authors: [{ name: "Julian Verwoerd", url: "https://portfolio.prowser.nl" }],
  creator: "Julian Verwoerd",
  publisher: "Julian Verwoerd",

  applicationName: "Julian Verwoerd Portfolio",
  referrer: "origin-when-cross-origin",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    title: "Portfolio - Julian Verwoerd | Software Developer",
    description:
      "Bekijk het portfolio van Julian Verwoerd: software developer met projecten in backend, webdevelopment, game development en IoT. Ervaring met Next.js, .NET, Unity, Arduino, ESP32 en Minecraft plugins.",
    siteName: "Portfolio - Julian Verwoerd",
  },

  twitter: {
    card: "summary_large_image",
    title: "Portfolio - Julian Verwoerd | Software Developer",
    description:
      "Software developer met projecten in Next.js, .NET, Unity, Arduino en Minecraft plugins. Bekijk mijn portfolio en skills.",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL(url),
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className="bg-neutral-900 text-white"
    >
      <body className="min-h-screen">
        <Header links={HEADER_LINKS} />
        <main className="2xl:px-60 xl:px-30 lg:px-15 md:px-10 px-5 py-15 min-h-[calc(100vh-17rem)]">
          {children}
        </main>
        <Footer links={FOOTER_LINKS} />
        <UmamiScript />
        <TailwindDebug />
      </body>
    </html>
  );
}
