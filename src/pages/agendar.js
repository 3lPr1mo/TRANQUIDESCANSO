import { AddButton } from "@/components/ReservasUI/AddButton";
import { FilterButton } from "@/components/ReservasUI/FilterButton";
import { ReservaList } from "@/components/ReservasUI/ReservaList";
import ReservasUI from "@/components/ReservasUI/ReservasUI";
import { Title } from "@/components/ReservasUI/Title";
import Sidebar from "@/components/Sidebar";
import Head from "next/head";
import { Input } from "postcss";

export default function reservas() {
    return (
      <div className="bg-white">
        <Head>
          <title>AGENDAR</title>
        </Head>
        <div className="flex items-center justify-center">
          <Sidebar />
          <div className="flex flex-col justify-center items-center">
            <Title />
            <div className="flex flex-row items-center"> {/* Contenedor flex para los componentes */}
              <Input />
              <div className="mt-10 ml-2"> {/* Espacio entre los componentes */}
                <FilterButton />
                <AddButton />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white">
          <ReservaList>
            <ReservasUI />
          </ReservaList>
        </div>
      </div>
    );
  }