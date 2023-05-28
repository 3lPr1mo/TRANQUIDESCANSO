import { Title } from "@/components/ReservasUI/Title";
import { Input } from "@/components/ReservasUI/Input";
import Sidebar from "@/components/Sidebar";
import Head from "next/head";
import { FilterButton } from "@/components/ReservasUI/FilterButton";
import { AddButton } from "@/components/ReservasUI/AddButton";
import { ReservaList } from "@/components/ReservasUI/ReservaList";
import ReservasUI from "@/components/ReservasUI/ReservasUI";

export default function reservas() {
  return (
    <>
      <Head>
        <title></title>
      </Head>
      <div className="grid grid-cols-2">
        <div>
          <Sidebar />
        </div>
        <div>
          <Title />
        </div>
        <div className="flex  place-items-center mt-10">
          <Input />
          <div>
            <FilterButton />
            <AddButton />
          </div>
        </div>
      </div>
      <ReservaList>
        <ReservasUI />
      </ReservaList>
    </>
  );
}
