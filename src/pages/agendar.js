import axios from "axios";
import { useEffect, useState } from "react";

function ReservaForm() {
  //Declaracion de los estados

  //Objeto reserva
  const [reserva, setReserva] = useState({
    id: null,
    num_habitaciones: null,
    num_personas: null,
    fecha_inic: "",
    fecha_fin: "",
    valor: null,
    valor_servicios: null,
    //estaod INT DEFAULT '1'
    id_hotel: null,
    id_titular: null,
    id_llegada: null,
    id_salida: null,
  });

  //Objeto titular
  const [titular, setTitular] = useState({
    id: null,
    nombre: "",
    direccion: "",
    id_agencia: "",
  });

  //Objeto telefono
  const [telefo, setTelefono] = useState({
    id_titular: null,
    telefono: "",
  });

  //Objeto acompañante
  /*const [acompanante, setAcompanante] = useState({
    id: null,
    nombre: "",
    edad: null,
    id_titular: null,
    mascota: null,
  });*/

  //Objeto agencia
  const [agencia, setAgencia] = useState({
    id: null,
    nombre: "",
  });

  //Objeto registro llegada
  const [fechaInicio, setFechaInicio] = useState("")

  //Objeto registro salida
  const [fechaFinal, setFechaFinal] = useState("")

  //Estados para condicionales
  const [serviciosOption, setServiciosOption] = useState("");
  //Estado para obtener el valor del hotel seleccionado en el combobox
  const [comboHotelOption, setComboHotelOption] = useState(null);
  //Estado para obtener los hoteles
  const [hoteles, setHoteles] = useState([]);
  //Estado para saber si pertenece o no a alguna organización
  const [pertenece, setPertenece] = useState(false);

  useEffect(() => {
    //Realizar la solicitud para obtener la lista de hoteles
    axios
      .get("http://localhost:3001/Route/AllHotel")
      .then((response) => {
        setHoteles(response.data); //Almacena la lista de hoteles
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Error al obtener la lista de hoteles", error);
      });
  }, []);

  //Funciones para controlar los estados

  //Almacena los datos digitados a setReserva
  const handleReservaChange = (e) => {
    const { name, value } = e.target;
    setReserva((prevReserva) => ({ ...prevReserva, [name]: value }));
  };
  //Almacena los datos digitados a setTitular
  const handleTitularChange = (e) => {
    const { name, value } = e.target;
    setTitular((prevTitular) => ({ ...prevTitular, [name]: value }));
  };
  //Almacenar el telefono del titular
  const handleTelefonoChange = (e) => {
    const { name, value } = e.target;
    setTelefono((prevTelefono) => ({ ...prevTelefono, [name]: value }));
    console.log(telefo);
  };
  // condicional de si va a tomar o no servicios
  const handleReservaRadioButton = (e) => {
    setServiciosOption(e.target.value);
  };
  //setter el valor escogido en el combobox de hotel
  const handleChangeHotelBox = (e) => {
    setComboHotelOption(e.target.value); //almacena el valor
    setReserva((prevReserva) => ({ ...prevReserva, id_hotel: e.target.value })); //se settea la foranea id_hotel en reserva
  };
  //setter de la fecha de inicio
  const handleFechaInicio = (e) => {
    setFechaInicio(e.target.value)
  }
  //setter de la fecha final
  const handleFechaFinal = (e) => {
    setFechaFinal(e.target.value)
  }
  //setter el valor escogido en el combobox de hotel
  const handlePertenece = (e) => {
    setPertenece(e.target.value); //almacena el valor
    //reserva.id_hotel = comboHotelOption
  };
  const handleAgencia = (e) => {
    setAgencia(e.target.value); //almacena el valor
    setTitular((prevTitular) => ({ ...prevTitular, id_agencia: agencia.id })); //settea la foranea de id_agencia en caso de pertenecer
    console.log("Id de la agencia en titular: " + titular.id_agencia);
  };

  //Funcion para enviar los datos a la base de datos
  const handleSubmit = (e) => {
    e.preventDefault(); //Evitar que se recargue la pagina
    //Settear las claves foraneas
    //id_tituar telefono
    setTelefono((prevTelefono) => ({
      ...prevTelefono,
      id_titular: titular.id,
    }));
    console.log("despues de submit: " + telefo.id_titular);
    console.log("despues de submit: " + telefo.telefono);
    //se settea e id_titular en reserva
    setReserva((prevReserva) => ({ ...prevReserva, id_titular: titular.id }));
    console.log(reserva);
    console.log(titular);

    enviarReserva();
  };

  const enviarReserva = async () => {
    try {
      const jsonReserva = JSON.stringify(reserva);
      const jsonTitular = JSON.stringify(titular);
      const jsonTelefono = JSON.stringify(telefo);
      let response = await axios.post(
        "http:localhost:3001/Route/creaReserva",
        jsonReserva,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //Verificar el codigo de estado de la respuesta
      if (response.status === 200) {
        console.log("Se envió correctamente");
      } else {
        console.log("Error al enviar la reserva");
      }

      response = await axios.post(
        "http:localhost:3001/Route/creaTitular",
        jsonTitular,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //Verificar el codigo de estado de la respuesta
      if (response.status === 200) {
        console.log("Se envió correctamente");
      } else {
        console.log("Error al enviar la reserva");
      }

      response = await axios.post(
        "http:localhost:3001/Route/creaTelTitular",
        jsonTelefono,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //Verificar el codigo de estado de la respuesta
      if (response.status === 200) {
        console.log("Se envió correctamente");
      } else {
        console.log("Error al enviar la reserva");
      }

      if (agencia != null) {
        const jsonAgencia = JSON.stringify(agencia);
        await axios.post("http:localhost:3001/Route/creaAgencia", jsonAgencia, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        //Verificar el codigo de estado de la respuesta
        if (response.status === 200) {
          console.log("Se envió correctamente");
        } else {
          console.log("Error al enviar la reserva");
        }
      }

      //Verificar el codigo de estado de la respuesta
      if (response.status === 200) {
        console.log("Se envió correctamente");
      } else {
        console.log("Error al enviar la reserva");
      }
    } catch (error) {
      console.log("Error al enviar la reserva: ", error);
    }
  };

  return (
    //SOLICITAR LOS DATOS DE LA RESERVA
    <div className="max-w-lg mx-auto">
      <h1 className="flex item-center justify-center text-gray-700 text-sm font-bold mb-2">
        AGENDAR RESERVA
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <label>
          ID de la reserva
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="id_reserva"
            type="number"
            name="id"
            placeholder="1234567890"
            value={reserva.id}
            onChange={handleReservaChange}
          />
        </label>
        <label>
          Número de habitaciones
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="n_habitaciones"
            type="number"
            name="num_habitaciones"
            placeholder="# habitaciones"
            value={reserva.num_habitaciones}
            onChange={handleReservaChange}
          />
        </label>
        <label>
          Número de personas
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="n_personas"
            type="number"
            name="num_personas"
            placeholder="# personas"
            value={reserva.num_personas}
            onChange={handleReservaChange}
          />
        </label>
        <label>
          Fecha de incio
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fechaInic"
            type="date"
            name="fecha_inic"
            value={reserva.fecha_inic}
            onChange={handleReservaChange}
          />
        </label>
        <label>
          Fecha final
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fechaInic"
            type="date"
            name="fecha_fin"
            value={reserva.fecha_fin}
            onChange={handleReservaChange}
          />
        </label>
        <label>
          Valor
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="valor"
            type="number"
            name="valor"
            placeholder="$$$$$$$"
            value={reserva.valor}
            onChange={handleReservaChange}
          />
        </label>
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
        {/* Mostrar lo siguiente si el usuario desea servicios */}
        {serviciosOption === "SI" && (
          <div>
            <label>
              Servicios a tomar
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="valor_servicios"
                type="number"
                name="valor_servicios"
                value={reserva.valor_servicios}
                onChange={handleReservaChange}
              />
            </label>
            <label>
              Valores de Servicios
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="valor_servicios"
                type="number"
                name="valor_servicios"
                value={reserva.valor_servicios}
                onChange={handleReservaChange}
              />
            </label>
          </div>
        )}
        <label>
          Selecciona un hotel:
          <select
            id="hotelesCombo"
            value={comboHotelOption}
            onChange={handleChangeHotelBox}
          >
            <option value="">-- Seleccione --</option>
            {hoteles.map((hotel) => (
              <option key={hotel.id} value={hotel.id}>
                {hotel.nombre}
              </option>
            ))}
          </select>
        </label>
        {/* AQUI EMPIEZA EL FORMULARIO DEL TITULAR */}
        <h2 className="flex item-center justify-center text-gray-700 text-sm font-bold mb-2">
          DATOS DEL TITULAR
        </h2>
        <label>
          ID del Titular
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="idTitular"
            type="number"
            name="id"
            placeholder="ID"
            value={titular.id}
            onChange={handleTitularChange}
          />
        </label>
        <label>
          Nombre Completo
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nombreTitular"
            type="text"
            name="nombre"
            placeholder="Joseju Seju"
            value={titular.nombre}
            onChange={handleTitularChange}
          />
        </label>
        <label>
          Telefono de contacto
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="telefonoTitular"
            type="number"
            name="telefono"
            placeholder="123-4567-890"
            value={telefo.telefono}
            onChange={handleTelefonoChange}
          />
        </label>
        <label>
          Direccion
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="telefonoTitular"
            type="text"
            name="direccion"
            placeholder="Carrera 90 # 50 - 90"
            value={titular.direccion}
            onChange={handleTitularChange}
          />
        </label>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          ¿Pertenece a alguna agencia?:
          <select
            id="combo2"
            value={pertenece}
            onChange={handlePertenece}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option
              className="block text-gray-700 text-sm font-bold mb-2"
              value=""
            >
              -- Seleccione --
            </option>
            <option
              className="block text-gray-700 text-sm font-bold mb-2"
              value="true"
            >
              Sí
            </option>
            <option
              className="block text-gray-700 text-sm font-bold mb-2"
              value="false"
            >
              No
            </option>
          </select>
        </label>
        {pertenece === "true" && (
          <>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              ID de la Agencia:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="id_Agencia"
                type="number"
                name="id"
                placeholder="digita id de agencia"
                value={agencia.id}
                onChange={handleAgencia}
              />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nombre de agencia:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nombreAgencia"
                type="text"
                name="nombre"
                placeholder="COMPAÑÍA S.A."
                value={agencia.nombre}
                onChange={handleAgencia}
              />
            </label>
          </>
        )}
        {/* BOTON PARA GUARDAR RESERVA */}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Guardar Reserva
        </button>
      </form>
    </div>
  );
}

export default ReservaForm;
