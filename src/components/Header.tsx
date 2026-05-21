"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  links: { label: string, url: string }[]
};

export default function Header({ links }: Props) {
  const pathname = usePathname();

  return (
    <header className="dark:bg-[#111111] w-full h-20 grid grid-cols-2 grid-rows-1 px-8">
      <div className="flex items-center my-auto">
        <Image
          src="/logo_80.png"
          alt="test"
          width={45}
          height={45}
          className="me-5"
        />
        <label className="text-3xl">Portfolio - Julian Verwoerd</label>
      </div>

      <div className="flex items-center justify-end my-auto gap-12 text-xl px-5">
        {links?.map((link) => {
          const isActive = pathname === link.url;
          return (
            <Link
              key={link.url}
              href={link.url}
              className={`cursor-pointer transition-all hover:text-purple-800 hover:scale-105 ${isActive ? "text-purple-900" : ""
                }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
