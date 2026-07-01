import * as Brands from "@/utils/brands.utils";

export const url = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const brands = [
  {
    name: "C#",
    href: "https://dotnet.microsoft.com/languages/csharp",
    Icon: Brands.CSharp,
  },
  {
    name: "JavaScript",
    href: "https://developer.mozilla.org/docs/Web/JavaScript",
    Icon: Brands.Javascript,
  },
  {
    name: "TypeScript",
    href: "https://www.typescriptlang.org/",
    Icon: Brands.Typescript,
  },
  {
    name: "Python",
    href: "https://www.python.org/",
    Icon: Brands.Python,
  },
  {
    name: "Java",
    href: "https://www.java.com/",
    Icon: Brands.Java,
  },
  {
    name: ".NET",
    href: "https://dotnet.microsoft.com/",
    Icon: Brands.Dotnet,
  },
  {
    name: "Node.js",
    href: "https://nodejs.org/",
    Icon: Brands.Nodejs,
  },
  {
    name: "Express.js",
    href: "https://expressjs.com/",
    Icon: Brands.Expressjs,
  },
  {
    name: "React",
    href: "https://react.dev/",
    Icon: Brands.React,
  },
  {
    name: "Prisma",
    href: "https://prisma.io/",
    Icon: Brands.Prisma,
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
    name: "Docker",
    href: "https://www.docker.com/",
    Icon: Brands.Docker,
  },
  {
    name: "Github",
    href: "https://github.com/",
    Icon: Brands.Github,
  },
  {
    name: "Linux",
    href: "https://www.linux.org/",
    Icon: Brands.Linux,
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
    "Node.js",
    "PHP",
    "Python",
    "React",
    "SQL",
    "Typescript",
    "Unity",
    "WinForms",
]