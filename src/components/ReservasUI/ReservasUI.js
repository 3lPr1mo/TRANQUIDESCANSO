import React, { useEffect, useState } from "react";
import axios from "axios";

function ReservasUI() {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    // Realizar la solicitud GET al backend en localhost:3001
    axios.get("http://localhost:3001/Route/AllReserva")
      .then(response => {
        // Actualizar el estado con la lista de reservas
        setReservas(response.data);
      })
      .catch(error => {
        console.error("Error al obtener las reservas:", error);
      });
  }, []); 

  if (!reservas) {
    return <div>Cargando...</div>;
  }

  const deleteReserva = async (idReserva, index) => {
    await axios.delete(`http://localhost:3001/Route/elimReserva/${idReserva}`);
    const updateReservas = [...reservas]
    updateReservas.splice(index, 1)
    setReservas(updateReservas)
  }

  return (
    <div className="bg-white">
      {
        reservas !== null ?
        (<div className="grid place-content-center">
        {reservas.map((reserva, index) => (
            <div key={reserva.id} className="inline-block border border-gray-200 rounded-xl mb-12">
              <div className="flex item-center justify-between p-4 border-b border-solid">
                <div className="flex items-center justify-between mx-auto max-w-4xl">
                  <div className="mr-20">
                    <p className="pl-3">reserva num: {reserva.id}</p>
                    <p className="pl-3">habitaciones: {reserva.num_habitaciones}</p>
                    <p className="pl-3">personas: {reserva.num_personas}</p>
                  </div>
                  <div className="mr-20">
                    <p className="pl-3">fecha inicio: {reserva.fecha_inic}</p>
                    <p className="pl-3">fecha fin: {reserva.fecha_fin}</p>
                    <p className="pl-3">valor: {reserva.valor}</p>
                    <p className="pl-3">
                      valor servicios: {reserva.valor_servicios}
                    </p>
                  </div>
                  <div className="mr-20">
                    <p className="pl-3">estado: {reserva.estado}</p>
                    <p className="pl-3">hotel: {reserva.id_hotel}</p>
                    <p className="pl-3">titular: {reserva.id_titular}</p>
                  </div>
                </div>
              </div>
              <div className="flex item-center justify-center">
                <button className="px-2 py-2 bg-red-500 hover:bg-red-700 text-white rounded-md ml-5 mr-5" onClick={() => deleteReserva(reserva.id, index)}>
                  Eliminar
                </button>
                <button className="px-2 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md ml-5">
                  Actualizar
                </button>
              </div>
            </div>
            ))}
        </div>
        )
        : null
      }
    </div>
  );
}

export default ReservasUI;
