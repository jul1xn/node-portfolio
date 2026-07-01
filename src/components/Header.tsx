"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type Props = {
  links: { label: string; url: string }[];
};

export default function Header({ links }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-[#111111] w-full px-8">

      {/* Top Bar */}
      <div className="h-20 grid lg:grid-cols-2 grid-cols-1 items-center">

        <div className="flex items-center w-full">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo_80.png"
              alt="Logo"
              width={45}
              height={45}
              className="me-5"
            />

            <span className="text-3xl hidden sm:inline">
              Portfolio - Julian Verwoerd
            </span>
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden ml-auto cursor-pointer text-gray-300 hover:text-white"
          >
            {open ? (
              <X className="h-10 w-10" />
            ) : (
              <Menu className="h-10 w-10" />
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center justify-end gap-12 text-xl px-5">
          {links?.map((link) => {
            const isActive = pathname === link.url;

            return (
              <Link
                key={link.url}
                href={link.url}
                className={`transition-all hover:text-purple-800 hover:scale-105 ${isActive ? "text-purple-900" : ""
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-96 pb-6" : "max-h-0"
          }`}
      >
        <div className="flex flex-col gap-5 text-lg">
          {links?.map((link) => {
            const isActive = pathname === link.url;

            return (
              <Link
                key={link.url}
                href={link.url}
                onClick={() => setOpen(false)}
                className={`transition-all hover:text-purple-800 ${isActive ? "text-purple-900" : ""
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}