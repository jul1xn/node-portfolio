import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Over mij",
  description:
    "Meer informatie over Julian Verwoerd. 17 jaar software developer student uit Veenendaal. Expertise in backend, fullstack, game development en IoT projecten.",
};

export default function AboutMe() {
    return (
        <div className="grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 gap-20 mb-20">
            <div className="text-start">
                <div className="flex pb-5 text-5xl">
                    <h1 className="font-light">Over mij</h1>
                </div>
                <p className="py-2">
                    Hoi! Ik ben Julian Verwoerd, 17 jaar en ik woon in Veenendaal. Ik zit op het mbo als Software
                    Developer
                    en ben al vroeg begonnen met programmeren. Doordat ik autodidact ben heb ik veel dingen zelf
                    geleerd
                    door op onderzoek te gaan en er daarna mee te experimenteren en ze uit te proberen.
                </p>
                <p className="py-2">
                    Ik ben rustig en introvert, maar kan me goed concentreren op wat ik doe. Vooral back-end en apps
                    vind ik
                    interessant. Hobbymatig maak ik ook vaak kleine game-ideeën. Ik vind het gaaf om te zien hoe
                    iets onder
                    de motorkap werkt en om creatieve oplossingen te bedenken.
                </p>
                <p className="py-2">
                    Ik kan goed zelfstandig werken, maar ook in een team gaat het prima. Ik ben rustig, creatief en
                    empathisch, dus ik luister graag en help waar ik kan. Ik kijk niet tegen problemen op, ik zie ze
                    juist
                    als uitdagingen. Er is bijna altijd wel een oplossing te vinden en het geeft me energie om die
                    te
                    bedenken.
                </p>
                <p className="py-2">
                    Naast programmeren heb ik genoeg andere hobby&apos;s. Ik game en programmeer graag, rij brommers en
                    sleutel
                    er ook aan. Ook maak ik graag muziek en vind ik auto&apos;s erg interessant. Ik bezoek graag
                    autoshows en
                    brommer evenementen en doe leuke dingen met vrienden.
                </p>
                <p className="py-2">
                    Wat ik later precies wil doen weet ik nog niet, maar het moet iets in de techwereld zijn. Zolang
                    ik kan
                    leren en bouwen, ben ik enthousiast en zit ik op mijn plek.
                </p>
                <p className="py-2 mb-8">
                    Voor meer informatie of bij interesse kun je <Link className="transition-colors text-purple-700 hover:text-purple-900" href="/contact">hier</Link> contact met mij
                    opnemen!
                </p>
                <Link
                    rel="nofollow"
                    href="/CV Julian.pdf"
                    className="inline-flex items-center gap-2 bg-purple-700 text-white px-5 py-3 text-xl rounded-full cursor-pointer transition-colors hover:bg-purple-900"
                >
                    <SquareArrowOutUpRight size={22} />
                    Bekijk hier mijn CV
                </Link>
            </div>
            <div className="relative h-full">
                <Image
                    className="rounded-2xl object-cover"
                    src="/me.jpeg"
                    alt="Foto van Julian"
                    fill
                    sizes={"1000x1000"}
                    loading="eager"
                    preload={true}
                />
            </div>
        </div>
    )
}