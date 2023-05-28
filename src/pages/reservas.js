import Sidebar from "@/components/Sidebar";
import Head from "next/head";

export default function reservas() {
  return (
    <>
      <Head>
        <title>TRANQUI HOME</title>
      </Head>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Sidebar />
        </div>
        <div className="flex h-screen place-items-center">
          <div>
            <div className="flex h-screen place-items-center">
              <div>
                <div className="m-5 place-items-center flex">
                    
                </div>
                <div className="m-5 place-items-center">
                  <div>
                    <h2 className="font-bold text-xl mb-2">JOSEJU SEJU</h2>
                    <p className="text-gray-700 text-base">ID: 12312321321</p>
                    <p className="text-gray-700 text-base">
                      Department: Engineering
                    </p>
                    <p className="text-gray-700 text-base">
                      Fecha de Nacimiento: 2004-03-18
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}