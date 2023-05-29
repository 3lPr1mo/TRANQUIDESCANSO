import Head from "next/head";
import { Title } from "@/components/HotelesUI/Title";
import { AddButton } from "@/components/HotelesUI/AddButton";
import { FilterButton } from "@/components/HotelesUI/FilterButton";
import { HotelesList} from "@/components/HotelesUI/HotelesList";
import Sidebar from "@/components/Sidebar";
import HotelesUI from "@/components/HotelesUI/HotelesUI";
import { Input } from "@/components/HotelesUI/Input";
export default function hoteles() {
  return (  
    <div className="bg-white">
      <Head>
        <title>Hoteles</title>
      </Head>
      <div className="flex items-center justify-center">
        <Sidebar />
        <div className="flex flex-col justify-center items-center">
          <Title />
          <div className="flex flex-row items-center">
            <Input />
            <div className="mt-10 ml-2">
              <FilterButton />
              <AddButton />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <HotelesList>
          <HotelesUI />
          <HotelesUI />
          <HotelesUI />
          <HotelesUI />
        </HotelesList>
      </div>
    </div>
  );
}