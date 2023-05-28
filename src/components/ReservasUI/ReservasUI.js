import React from "react";

function ReservasUI() {
  return (
    <div>
      <div className="flex item-center justify-between p-4 border-b border-solid m-5">
        <div className="flex item-center">
          <p className="pl-3">reserva num: 1</p>
          <p className="pl-3">habitaciones: 1</p>
          <p className="pl-3">personas: 3</p>
          <p className="pl-3">fecha inicio: 2022-01-02</p>
          <p className="pl-3">fecha fin: 2022-01-06</p>
          <p className="pl-3">valor: 300</p>
          <p className="pl-3">valor servicios: 100</p>
          <p className="pl-3">estado: 1</p>
          <p className="pl-3">hotel: 1</p>
          <p className="pl-3">titular: 2</p>
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

export default ReservasUI;
