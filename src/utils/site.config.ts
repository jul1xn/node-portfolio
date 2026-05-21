import * as Brands from "@/utils/brands.utils";

export const url = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const brands = [
  {
    name: "Next.js",
    href: "https://nextjs.org/",
    Icon: Brands.Nextjs,
  },
  {
    name: "Node.js",
    href: "https://nodejs.org/",
    Icon: Brands.Nodejs,
  },
  {
    name: "TypeScript",
    href: "https://www.typescriptlang.org/",
    Icon: Brands.TypeScript,
  },
  {
    name: "JavaScript",
    href: "https://developer.mozilla.org/docs/Web/JavaScript",
    Icon: Brands.JavaScript,
  },
  {
    name: "Java",
    href: "https://www.java.com/",
    Icon: Brands.Java,
  },
  {
    name: "C#",
    href: "https://dotnet.microsoft.com/languages/csharp",
    Icon: Brands.CS,
  },
  {
    name: "C++",
    href: "https://en.wikipedia.org/wiki/C%2B%2B",
    Icon: Brands.CPP,
  },
  {
    name: "Unity",
    href: "https://unity.com/",
    Icon: Brands.Unity,
  },
  {
    name: "Lua",
    href: "https://lua.org/",
    Icon: Brands.Lua,
  },
  {
    name: "PHP",
    href: "https://www.php.net/",
    Icon: Brands.Php,
  },
  {
    name: "MySQL",
    href: "https://www.mysql.com/",
    Icon: Brands.MySQL,
  },
  {
    name: "PostgreSQL",
    href: "https://www.postgresql.org/",
    Icon: Brands.PostgreSQL,
  },
  {
    name: "Python",
    href: "https://www.python.org/",
    Icon: Brands.Python,
  },
]
export const HEADER_LINKS = [
  { label: "Home", url: "/" },
  { label: "Over mij", url: "/over-mij" },
  { label: "Projecten", url: "/projecten" },
  { label: "Contact", url: "/contact" },
];

export const FOOTER_LINKS = [
  { label: "Home", url: "/" },
  { label: "Over mij", url: "/over-mij" },
  { label: "CV", url: "/CV Julian.pdf" },
  { label: "Projecten", url: "/projecten" },
  { label: "Contact", url: "/contact" },
];

export const FILTERS = [
    "Arduino",
    "C#",
    "C++",
    "Css",
    "Html",
    "Java",
    "Javascript",
    "Lua",
    "MySQL",
    "PHP",
    "Python",
    "React",
    "SQL",
    "Typescript",
    "Unity",
    "WinForms",
]