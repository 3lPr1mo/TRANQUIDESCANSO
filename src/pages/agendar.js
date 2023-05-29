import { Input } from "@/components/AgendarUI/Input";
import axios from "axios";
import { useState } from "react";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReserva((prevReserva) => ({ ...prevReserva, [name]: value }));
  };

  const handleChangeCombobox = (e) => {
    setSelectedOption(e.target.value); // Actualizar el estado cuando se selecciona una opción
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
        <h2 className="block text-gray-700 text-sm font-bold mb-2">
          AGENDAR RESERVA
        </h2>
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
            id="numero"
            type="number"
            name="numero"
            placeholder="digita un número"
            value={reserva.numero}
            onChange={handleChange}
          />
        </label>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Personas:
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="numero"
            type="number"
            name="numero"
            placeholder="digita un número"
            value={reserva.numero}
            onChange={handleChange}
          />
        </label>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          fecha inicio:
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="numero"
            type="date"
            name="numero"
            value={reserva.numero}
            onChange={handleChange}
          />
        </label>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          fecha final:
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="numero"
            type="date"
            name="numero"
            value={reserva.numero}
            onChange={handleChange}
          />
        </label>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Valor:
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="numero"
            type="number"
            name="numero"
            placeholder="$$$$$$$"
            value={reserva.numero}
            onChange={handleChange}
          />
        </label>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Valor servicios:
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="numero"
            type="number"
            name="numero"
            placeholder="$$$$$$$"
            value={reserva.numero}
            onChange={handleChange}
          />
        </label>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Estado:
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="numero"
            type="number"
            name="numero"
            placeholder="1 ó 0"
            value={reserva.numero}
            onChange={handleChange}
          />
        </label>
        <div className="flex flex-col">
          <label htmlFor="combo" className="block text-gray-700 text-sm font-bold mb-2">
            Selecciona una opción:
          </label>
          <select
            id="combo"
            value={selectedOption}
            onChange={handleChangeCombobox}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option className="block text-gray-700 text-sm font-bold mb-2" value="">-- Seleccione un hotel --</option>
            <option className="block text-gray-700 text-sm font-bold mb-2" value="opcion1">Opción 1</option>
            <option className="block text-gray-700 text-sm font-bold mb-2" value="opcion2">Opción 2</option>
            <option className="block text-gray-700 text-sm font-bold mb-2" value="opcion3">Opción 3</option>
          </select>
        </div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Titular:
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="numero"
            type="number"
            name="numero"
            placeholder="Juanito"
            value={reserva.numero}
            onChange={handleChange}
          />
        </label>
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
