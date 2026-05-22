import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import RevealContact from "./RevealContact";

type Props = {
    links: { label: string, url: string }[]
};

export default function Footer({ links }: Props) {
    return (
        <footer className="bg-[#111111] text-gray-300">
            <div className="mx-auto max-w-7xl px-6 py-16 text-center">
                <nav className="flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm mb-10">
                    {links?.map(link => (
                        <a key={link.url} href={link.url} className="hover:text-white transition">{link.label}</a>
                    ))}
                </nav>
                <div className="flex justify-center gap-8 mb-10">

                    <a href="https://github.com/jul1xn/" className="hover:text-white transition">
                        <span className="sr-only">GitHub</span>
                        <FaGithub className="h-6 w-6" />
                    </a>

                    <a href="https://www.linkedin.com/in/julian-v-84a02a356/" className="hover:text-white transition">
                        <span className="sr-only">Linkedin</span>
                        <FaLinkedinIn className="h-6 w-6" />
                    </a>

                    <RevealContact type="email" className="hover:text-white transition cursor-pointer">
                        <span className="sr-only">Email</span>
                        <MdEmail className="h-6 w-6" />
                    </RevealContact>

                    <RevealContact type="phone" className="hover:text-white transition cursor-pointer">
                        <span className="sr-only">Phone</span>
                        <FaPhone className="h-6 w-6" />
                    </RevealContact>


                </div>

                <p className="text-sm text-gray-500">
                    © {new Date().getFullYear()} Prowser Network. Alle rechten voorbehouden.
                </p>
            </div>
        </footer>
    );
}