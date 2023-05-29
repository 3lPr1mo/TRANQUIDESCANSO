import React from "react";

function HotelesUI() {
  return (
    <div className="inline-block border border-gray-200 rounded-xl mb-12">
      <div className="flex item-center justify-between p-4 border-b border-solid">
        <div className="flex items-center justify-between mx-auto max-w-4xl">
          <div className="mr-10">
            <p className="pl-2">Hotel id: 1</p>
            <p className="pl-2">Nombre: Hotel X</p>
            <p className="pl-2">Direccion: Direccion X</p>
          </div>
          <div className="mr-90">
            <p className="pl-2">Año de inaguracion: 2000</p>
            <p className="pl-2">Antiguedad:  23</p>
            <p className="pl-2">Ciudad: 1</p>
          </div>
        </div>
      </div>
      <div className="flex item-center justify-center">
        <button className="px-2 py-2 bg-red-500 hover:bg-red-700 text-white rounded-md ml-5 mr-5">
          Eliminar
        </button>
        <button className="px-2 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md ml-5">
          Actualizar
        </button>
      </div>
    </div>
  );
}
export default HotelesUI;