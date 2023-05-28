import Sidebar from "@/components/Sidebar";
import Head from "next/head";

export default function home() {
  return (
    <>
      <Head>
        <title>TRANQUI HOME</title>
      </Head>
      <div className="flex">
        <Sidebar />
        <h3 className="ml-4">HOME PRUEBA</h3>
      </div>
    </>
  );
}
