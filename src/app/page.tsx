import Counter from "@/components/Counter";
import Seperator from "@/components/Seperator";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-2 grid-rows-1 mb-20">
        <div className="text-start">
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
          <Link href="/over-mij" className="bg-purple-950 text-white px-5 py-3 text-xl rounded-md cursor-pointer transition-colors hover:bg-purple-900">
            Lees meer over mij
          </Link>
        </div>
        <div>
          {/* Hier komt de images carousel */}
        </div>
      </div>
      <Seperator />
      <div className="text-center grid grid-cols-3 grid-rows-1">
        <Counter text="Bekende talen" value={11} delay={0} />
        <Counter text="Jaar ervaring" value={new Date().getFullYear() - 2017} extension="+" delay={250} />
        <Counter text="Regels geschreven" value={1000} extension="+" delay={500} />
      </div>
      <Seperator />
      <div className="mt-10">
        <h1 className="text-center font-light text-4xl">Uitgelichte projecten</h1>
        <div>
          {/* Hier komen projecten cards, met een component voor id */}
        </div>
      </div>
    </>
  );
}
