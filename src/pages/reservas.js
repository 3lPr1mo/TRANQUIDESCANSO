import { Title } from "@/components/ReservasUI/Title";
import { Input } from "@/components/ReservasUI/Input";
import Sidebar from "@/components/Sidebar";
import Head from "next/head";
import { FilterButton } from "@/components/ReservasUI/FilterButton";
import { AddButton } from "@/components/ReservasUI/AddButton";
import { ReservaList } from "@/components/ReservasUI/ReservaList";
import ReservasUI from "@/components/ReservasUI/ReservasUI";
import { useState } from "react";
export default function Reservas() {
  const [searchedValue, setSearchedValue] = useState("");

  const handleInputChange = (e) => {
    setSearchedValue(e.target.value);
  }

  return (
    <div className="bg-white">
      <Head>
        <title>RESERVAS</title>
      </Head>
      <div className="flex items-center justify-center">
        <Sidebar />
        <div className="flex flex-col justify-center items-center">
          <Title />
          <div className="flex flex-row items-center"> {/* Contenedor flex para los componentes */}
            <Input onChange={handleInputChange}/>
            <div className="mt-10 ml-2"> {/* Espacio entre los componentes */}
              <FilterButton searchedValue={searchedValue}/>
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