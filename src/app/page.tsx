import Counter from "@/components/Counter";
import ProjectCard from "@/components/ProjectCard";
import Seperator from "@/components/Seperator";
import Terminal from "@/components/Terminal";
import ViewFadeWrapper from "@/components/ViewFadeWrapper";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { brands } from "@/utils/site.config";

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-2 grid-rows-1 mb-20">
        <div className="text-start me-15">
          <div className="flex pb-5 text-6xl">
            <h1 className="font-light">Hallo!</h1>
            <div className="px-3 animate__animated animate__swing animate__slow animate__delay-1s">
              👋
            </div>
          </div>
          <p className="py-2">
            Mijn naam is Julian Verwoerd, ik ben 17 jaar en tweedejaars student Software Developer. Ik ben
            erg
            geïnteresseerd in technologie, design en programmeren. Tijdens mijn opleiding werk ik aan
            verschillende projecten en leer ik hoe je van een idee een goed werkende app maakt.
          </p>
          <p className="py-2">
            Het is voor mij belangrijk om niet alleen te coderen, maar ook te snappen hoe een app
            gebruiksvriendelijk en efficiënt kan zijn. Ik vind het leuk om uitdagingen aan te gaan, nieuwe
            dingen te leren en creatieve oplossingen te bedenken voor technische problemen.
          </p>
          <p className="py-2 mb-8">
            Op deze website deel ik mijn projecten, vaardigheden en mijn groei als beginnende Developer. Neem
            gerust een kijkje en ontdek waar ik momenteel mee bezig ben!
          </p>
          <Link href="/over-mij" className="inline-flex items-center gap-2 bg-purple-700 text-white px-5 py-3 text-xl rounded-full cursor-pointer transition-colors hover:bg-purple-900">
            <ArrowRight />
            Lees meer over mij
          </Link>
        </div>
        <div>
          <Terminal/>
        </div>
      </div>
      <Seperator />
      <ViewFadeWrapper className="text-center grid grid-cols-3 grid-rows-1">
        <Counter text="Bekende talen" value={11} delay={0} />
        <Counter text="Jaar ervaring" value={new Date().getFullYear() - 2017} extension="+" delay={250} />
        <Counter text="Regels geschreven" value={10000} extension="+" delay={500} />
      </ViewFadeWrapper>
      <Seperator />
      <ViewFadeWrapper className="mt-10">
        <h1 className="text-center font-light text-4xl mb-8">Uitgelichte projecten</h1>
        <div className="grid grid-cols-3 grid-rows-1 gap-5">
          <ProjectCard id="portfolio-website" />
          <ProjectCard id="school-examen-game" />
          <ProjectCard id="minecraft-clone" />
        </div>
        <div className="my-5 mx-auto text-center align-center">
          <Link href="/projecten" className="inline-flex items-center gap-2 bg-purple-700 text-white px-5 py-3 text-xl rounded-full cursor-pointer transition-colors hover:bg-purple-900">
            <ArrowRight />
            Bekijk alle projecten
          </Link>
        </div>
      </ViewFadeWrapper>
      <Seperator />
      <ViewFadeWrapper className="mb-3 mt-5">
        <h1 className="text-center font-light text-4xl mb-8">Tools en talen die ik gebruik</h1>
        <div className="relative w-full overflow-hidden">
          <div className="group flex w-max gap-10 animate-scroll-brands">
            {[...brands, ...brands].map((brand, index) => (
              <Link
                key={`${brand.name}-${index}`}
                href={brand.href}
                target="_blank"
                className="shrink-0 transition-opacity group-hover:opacity-50 hover:opacity-100!"
              >
                <brand.Icon className="h-30 w-30" />
              </Link>
            ))}
          </div>
        </div>
      </ViewFadeWrapper>
    </>
  );
}
