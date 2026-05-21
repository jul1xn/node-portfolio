import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "@/components/Footer";
import 'dotenv/config';

export const metadata: Metadata = {
  title: {
    default: "Portfolio - Julian Verwoerd | Software Developer",
    template: "%s | Julian Verwoerd",
  },
  description:
    "Portfolio van Julian Verwoerd, 17 jaar en software developer student uit Veenendaal. Zelflerende developer met ervaring in backend en fullstack development. Bouwt projecten met Next.js, .NET, C#, Java, Unity, Arduino en ESP32. Van webapps tot game development en IoT projecten met MQTT en Home Assistant integratie.",

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

  authors: [{ name: "Julian Verwoerd" }],
  creator: "Julian Verwoerd",

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
  },
  metadataBase: new URL("https://portfolio.prowser.nl")
};

const HEADER_LINKS = [
  { label: "Home", url: "/" },
  { label: "Over mij", url: "/over-mij" },
  { label: "Projecten", url: "/projecten" },
  { label: "Contact", url: "/contact" },
];

const FOOTER_LINKS = [
  { label: "Home", url: "/" },
  { label: "Over mij", url: "/over-mij" },
  { label: "CV", url: "/CV Julian.pdf" },
  { label: "Projecten", url: "/projecten" },
  { label: "Contact", url: "/contact" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className="dark:bg-neutral-900 dark:text-white"
    >
      <body className="min-h-screen">
        <Header links={HEADER_LINKS} />
        <main className="px-60 py-15 min-h-[calc(100vh-17rem)]">
          {children}
        </main>
        <Footer links={FOOTER_LINKS} />
      </body>
    </html>
  );
}
