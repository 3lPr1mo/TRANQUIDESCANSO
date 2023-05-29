import axios from "axios";
import React, { useEffect, useState } from "react";

function HotelesUI() {
  const [hoteles, setHoteles] = useState([]);

  useEffect(() => {
    // Realizar la solicitud GET al backend en localhost:3001
    axios
      .get("http://localhost:3001/Route/AllHotel")
      .then((response) => {
        // Actualizar el estado con la lista de reservas
        setHoteles(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las reservas:", error);
      });
  }, []);

  return (
    <div className="bg-white">
      {hoteles !== null ? (
        <div className="grid place-content-center">
          {hoteles.map((hotel) => (
            <div key={hotel.id} className="inline-block border border-gray-200 rounded-xl mb-12">
              <div className="flex item-center justify-between p-4 border-b border-solid">
                <div className="flex items-center justify-between mx-auto max-w-4xl">
                  <div className="mr-10">
                    <p className="pl-2">Hotel id: {hotel.id}</p>
                    <p className="pl-2">Nombre: {hotel.nombre}</p>
                    <p className="pl-2">Direccion: {hotel.direccion}</p>
                  </div>
                  <div className="mr-90">
                    <p className="pl-2">Año de inaguracion: {hotel.anio_inaguracion}</p>
                    <p className="pl-2">Antiguedad: {hotel.antiguedad}</p>
                    <p className="pl-2">Ciudad: {hotel.id_ciudad}</p>
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
          ))}
        </div>
      ) : null}
    </div>
  );
}
export default HotelesUI;
