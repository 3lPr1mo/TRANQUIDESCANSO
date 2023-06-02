import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Habitaciones() {
  //next router
  const router = useRouter()
  //Estados de tablas
  const [tipoHabitacion, setTipoHabitacion] = useState({
    id: null,
    nombre: "",
  });
  const [habitacion, setHabitacion] = useState({
    id: null,
    id_tipoHabitacion: null,
    reservada: null,
  });
  const [servicio, setServicio] = useState({
    id: null,
    nombre: "",
    valor: null,
  });
  const [pago, setPago] = useState({
    fecha_pago: null,
    valor: null,
  });
  const [mostrarCampo, setMostrarCampo] = useState(true);
  const [pagoIngresado, setPagoIngresado] = useState(null);
  const [habitaciones, setHabitaciones] = useState([]);
  const [tipoHabitaciones, setTipoHabitaciones] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [comboBoxOption, setComboBoxOption] = useState(null);
  const [comboHabitacion, setComboHabitacion] = useState(null);
  const [serviciosOption, setServiciosOption] = useState("");
  const [comboServicio, setComboServicio] = useState(null);
  const [nombreTipoHabitacion, setNombreTipoHabitacion] = useState("");

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

  useEffect(() => {
    console.log(habitacion);
  }, [habitacion]);

  useEffect(() => {
    console.log(nombreTipoHabitacion);
  }, [nombreTipoHabitacion]);

  useEffect(() => {
    console.log(servicio);
  }, [servicio]);

  useEffect(() => {
    const jsonPago = JSON.stringify(pago);
    axios.post("http://localhost:3001/Route/creaPago", jsonPago, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(pago);
  }, [pago]);

  const handleComboServicios = async (e) => {
    setComboServicio(e.target.value);
    const valor = e.target.value;
    try {
      const response = await axios.get(
        `http://localhost:3001/Route/Servicio/${valor}`
      );
      if (response.data.length > 0) {
        const newServicio = {
          id: response.data[0].id,
          nombre: response.data[0].nombre,
          valor: response.data[0].valor,
        };
        setServicio(newServicio);
      }
    } catch (error) {
      console.error(error);
    }
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

  const handleComboHabitacion = async (e) => {
    setComboHabitacion(e.target.value);
    const valor = e.target.value;

    if (valor !== undefined) {
      try {
        const response = await axios.get(
          `http://localhost:3001/Route/Habitacion/${valor}`
        );
        if (response.data.length > 0) {
          const newHabitacion = {
            id: response.data[0].id,
            id_tipohabitacion: response.data[0].id_tipohabitacion,
            reservada: response.data[0].reservada,
          };
          setHabitacion(newHabitacion);
        }
        //Trayendo el nombre del tipo de habitacion
        const responseTipo = await axios.get(
          `http://localhost:3001/Route/TipHabi/${response.data[0].id_tipohabitacion}`
        );
        if (responseTipo.data.length > 0) {
          setNombreTipoHabitacion(responseTipo.data[0].nombre);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handlePago = (e) => {
    setPagoIngresado(e.target.value);
  };

  //El usuario debe escoger una habitacion, y dependiendo de lo que escoja, se mostrará si que tipo de habitacion es
  //Eliminar el estado

  const handleSubmit = async (e) => {
    e.preventDefault();
    const getReservas = await axios.get(
      "http://localhost:3001/Route/AllReserva"
    );
    const getLastReservas = getReservas.data[getReservas.data.length - 1];
    console.log(getLastReservas.id);
    if (
      pagoIngresado >= getLastReservas.valor * 0.2 &&
      getLastReservas.valor >= pagoIngresado
    ) {
      //Cambiar el estado de la habitación a 0 (Actualizar)
      await axios.put(
        `http://localhost:3001/Route/upHabitacion/${habitacion.id}`,
        { reservada: 1 },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //Traer el id del titular
      const getTitular = await axios.get("http://localhost:3001/Route/AllTitular")
      const getLastTitular = getTitular.data[getTitular.data.length - 1]
      //Almacenar tabla habitacion titular
      await axios.post(
        "http://localhost:3001/Route/creaHabiTitul",
        { id_titular: getLastTitular.id, id_habitacion: habitacion.id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMostrarCampo(false);
      if (serviciosOption === "SI") {
        const servicioReserva = {
          id_reserva: getLastReservas.id,
          id_servicio: servicio.id,
          total_costo: servicio.valor,
        };
        const jsonServRes = JSON.stringify(servicioReserva);
        console.log("JSON DE SERVICIO RESERVA", jsonServRes);
        await axios.post(
          `http://localhost:3001/Route/creaServRes`,
          jsonServRes,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(servicioReserva, jsonServRes);
      }
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const formatedDate = `${year}-${month}-${day}`;
      console.log(formatedDate);
      setPago({
        fecha_pago: formatedDate,
        valor: parseInt(pagoIngresado),
      });

      const response = await axios.get("http://localhost:3001/Route/AllPago");
      if (response.data.length > 0) {
        const lastPago = response.data.pop();
        console.log(lastPago);
        const jsonPagoReserva = JSON.stringify({
          id_reserva: getLastReservas.id,
          id_pago: lastPago.id,
        });
        console.log(jsonPagoReserva);
        await axios.post(
          "http://localhost:3001/Route/creaPagoRes",
          jsonPagoReserva,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
    } else {
      setPagoIngresado(null);
      window.alert("El valor no equivale al 20%");
    }

    router.push("/reservas")
    //Logica para mandar a la base de datos
    //Según lo escogido en los combo box, obtener los id y mandarlos a la tabla servicios_reserva
    //id_reserva, id_servicio y el valor pagado (valor por el serivcio)
    //Tambien enviar id's a la tabla habitacion titular -> id_titular y id_habitacion
  };

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
        <h4>
          El tipo de habitacion es:
          <p>{nombreTipoHabitacion}</p>
          {/*<select
            id="tipoHabitacion"
            value={comboBoxOption}
            onChange={handleComboBoxTipoHab}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value=""
            >
              -- Seleccione arriba --
            </option>
          </select>*/}
        </h4>
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
                {servicios.map((serv) => (
                  <option key={serv.id} value={serv.id}>
                    {serv.nombre}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}
        {mostrarCampo && (
          <label>
            Valor a pagar (bono)
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="pago_reserva"
              type="number"
              placeholder="$$$$$$$"
              value={pagoIngresado}
              onChange={handlePago}
            />
          </label>
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
