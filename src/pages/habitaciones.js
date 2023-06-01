import axios from "axios";
import { useEffect, useState } from "react";

function Habitaciones() {
  //Estados de tablas
  const [tipoHabitacion, setTipoHabitacion] = useState({
    id: null,
    nombre: "",
  });
  const [habitacion, setHabitacion] = useState({
    id: null,
    id_TipoHabitacion: null,
    reservada: null,
  });
  const [servicio, setServicio] = useState({
    id: null,
    nombre: "",
    valor: null,
  });
  const [habitaciones, setHabitaciones] = useState([]);
  const [tipoHabitaciones, setTipoHabitaciones] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [comboBoxOption, setComboBoxOption] = useState(null);
  const [comboHabitacion, setComboHabitacion] = useState(null);
  const [serviciosOption, setServiciosOption] = useState("");
  const [comboServicio, setComboServicio] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/Route/AllHabitacion")
      .then((response) => {
        setHabitaciones(response.data);
        console.log(habitaciones);
      })
      .catch((error) => {
        console.log("Error al obtener la lista de habitaciones", error);
      });
    axios
      .get("http://localhost:3001/Route/AllTipHabi")
      .then((response) => {
        setTipoHabitaciones(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Error al obtener la lista de tipo de habitacion", error);
      });
    axios
      .get("http://localhost:3001/Route/AllServicio")
      .then((response) => {
        setServicios(response.data);
        console.log(servicios);
      })
      .catch((error) => {
        console.log("Error al obtener la lista de servicios", error);
      });
  }, []);

  const handleComboServicios = (e) => {
    setComboServicio(e.target.value);
    setServicio((prevServicio) => ({
      ...prevServicio,
      id: parseInt(e.target.value),
    }));
  };

  const handleComboBoxTipoHab = (e) => {
    setComboBoxOption(e.target.value); //almacena el valor
    setTipoHabitacion((prevTipoHabitacion) => ({
      ...prevTipoHabitacion,
      id: parseInt(e.target.value),
    }));
  };

  const handleReservaRadioButton = (e) => {
    setServiciosOption(e.target.value);
  };

  const handleComboHabitacion = (e) => {
    setComboHabitacion(e.target.value);
    setHabitacion((prevHabitacion) => ({
      ...prevHabitacion,
      id: e.target.value,
    }));
  };

  const handleSubmit = () => {};

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="flex item-center justify-center text-gray-700 text-sm font-bold mb-2">
        SELECCION DE HABITACIONES
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <label>
          Selecciona un tipo de habitacion:
          <select
            id="tipoHabitacion"
            value={comboBoxOption}
            onChange={handleComboBoxTipoHab}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value=""
            >
              -- Seleccione --
            </option>
            {tipoHabitaciones.map((th) => (
              <option
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                key={th.id}
                value={th.id}
              >
                {th.nombre}
              </option>
            ))}
          </select>
        </label>
        <label>
          Selecciona una habitacion:
          <select
            id="habitacion"
            value={comboHabitacion}
            onChange={handleComboHabitacion}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value=""
            >
              -- Seleccione --
            </option>
            {habitaciones.map((habit) => {
              if (habit.reservada !== 1) {
                return (
                  <option key={habit.id} value={habit.id}>
                    {habit.id}
                  </option>
                );
              }
              return null;
            })}
          </select>
        </label>
        <div>
          <h4>¿Desea tomar servicios adicionales?</h4>
          <label>
            SI
            <input
              type="radio"
              value="SI"
              checked={serviciosOption === "SI"}
              onChange={handleReservaRadioButton}
            />
          </label>
          <label>
            NO
            <input
              type="radio"
              value="NO"
              checked={serviciosOption === "NO"}
              onChange={handleReservaRadioButton}
            />
          </label>
        </div>
        {serviciosOption === "SI" && (
          <div>
            <label>
              Servicios a tomar
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="serviciosATomar"
                value={comboServicio}
                onChange={handleComboServicios}
              >
                <option value="">-- Seleccione --</option>
                {console.log(servicios.length)}
                {servicios.map((serv) => (
                  <option key={serv.id} value={serv.id}>
                    {serv.nombre}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          GUARDAR DATOS
        </button>
      </form>
    </div>
  );
}

export default Habitaciones;
