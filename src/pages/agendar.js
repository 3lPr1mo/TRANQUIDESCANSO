import { Input } from "@/components/AgendarUI/Input";
import axios from "axios";
import { useEffect, useState } from "react";

function ReservaForm() {
  const [selectedOption, setSelectedOption] = useState("");
  const [reserva, setReserva] = useState({
    numero: "",
    habitaciones: "",
    personas: "",
    fechaInicio: "",
    fechaFin: "",
    valor: "",
    valorServicios: "",
    estado: "",
    hotel: "",
    titular: "",
  });

  const [titular, setTitular] = useState({
    id: "",
    nombre: "",
    direccion: "",
    id_Agencia: "",
  });

  const [telefonos, setTelefonos] = useState({
    idTitular: "",
    telefono: "",
  });

  const [hoteles, setHoteles] = useState([]);

  useEffect(() => {
    // Realizar la solicitud GET para obtener la lista de hoteles
    axios
      .get("http://localhost:3001/Route/AllHotel")
      .then((response) => {
        setHoteles(response.data); // Actualizar el estado con la lista de hoteles obtenidos
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de hoteles:", error);
        // Manejar el error de alguna manera
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReserva((prevReserva) => ({ ...prevReserva, [name]: value }));
  };

  const handleChangeCombobox = (e) => {
    setSelectedOption(e.target.value); // Actualizar el estado cuando se selecciona una opción
    reserva.hotel = selectedOption;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/Route/creaServicio", reserva)
      .then((response) => {
        console.log("Reserva creada:", response.data);
        // Realizar alguna acción adicional si es necesario
      })
      .catch((error) => {
        console.error("Error al crear la reserva:", error);
        // Manejar el error de alguna manera
      });
  };

  return (
    <div className="max-w-md mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h1 className="flex item-center justify-center text-gray-700 text-sm font-bold mb-2">
          AGENDAR RESERVA
        </h1>
        <h3 className="text-gray-700 text-sm font-bold mb-2">
          DATOS DEL TITULAR
        </h3>
        <h3 className="text-gray-700 text-sm font-bold mb-2">
          DATOS DEL LA RESERVA
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="numero"
            >
              Número de Reserva:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="numero"
              type="number"
              name="numero"
              placeholder="digita un número"
              value={reserva.numero}
              onChange={handleChange}
            />
          </div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Habitaciones:
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="habitaciones"
              type="number"
              name="habitaciones"
              placeholder="digita un número"
              value={reserva.habitaciones}
              onChange={handleChange}
            />
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Personas:
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="personas"
              type="number"
              name="personas"
              placeholder="digita un número"
              value={reserva.personas}
              onChange={handleChange}
            />
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            fecha inicio:
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fechaInic"
              type="date"
              name="fechaInicio"
              value={reserva.fechaInicio}
              onChange={handleChange}
            />
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            fecha final:
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fechaFin"
              type="date"
              name="fechaFin"
              value={reserva.fechaFin}
              onChange={handleChange}
            />
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Valor:
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="valor"
              type="number"
              name="valor"
              placeholder="$$$$$$$"
              value={reserva.valor}
              onChange={handleChange}
            />
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Valor servicios:
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="valorServicio"
              type="number"
              name="valorServicios"
              placeholder="$$$$$$$"
              value={reserva.valorServicios}
              onChange={handleChange}
            />
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Estado:
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="estado"
              type="number"
              name="estado"
              placeholder="1 ó 0"
              value={reserva.estado}
              onChange={handleChange}
            />
          </label>
          <div className="flex flex-col">
            <label
              htmlFor="combo"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Selecciona una hotel:
            </label>
            <select
              id="combo"
              value={selectedOption}
              onChange={handleChangeCombobox}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option
                className="block text-gray-700 text-sm font-bold mb-2"
                value=""
              >
                -- Seleccione --
              </option>
              {hoteles.map((hotel) => (
                <option key={hotel.id} value={hotel.id}>
                  {hotel.nombre}
                </option>
              ))}
            </select>
          </div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Titular:
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="titular"
              type="text"
              name="titular"
              placeholder="Juanito"
              value={reserva.titular}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="flex items-center justify-end mt-5">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Guardar Reserva
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservaForm;
