import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function ReservaForm() {
  //Router para ir a la siguiente página
  const router = useRouter();

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
    id_agencia: null,
  });

  //Objeto telefono
  const [telefo, setTelefono] = useState({
    id_titular: null,
    telefono: "",
  });

  //Objeto acompañante
  const [acompanante, setAcompanante] = useState([]);

  // Estado para manejar cuantos form de acompañante mostrar
  const [acompCountForm, setAcompCountForm] = useState(0);

  //Objeto agencia
  const [agencia, setAgencia] = useState({
    nombre: null,
  });

  //Objeto registro llegada
  const [fechaInicio, setFechaInicio] = useState("");

  //Objeto registro salida
  const [fechaFinal, setFechaFinal] = useState("");

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
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de hoteles", error);
      });
  }, []);

  //Funciones para controlar los estados

  //Almacena los datos digitados a setReserva
  const handleReservaChange = (e) => {
    const { name, value } = e.target;
    let parsedValue = value;
    //console.log(value);
    if (
      name === "id" ||
      name === "id_hotel" ||
      name === "id_titular" ||
      name.includes("num_") ||
      name === "valor"
    ) {
      parsedValue = parseInt(value);
    }
    setReserva((prevReserva) => ({ ...prevReserva, [name]: parsedValue }));
    if (name === "num_personas") {
      setAcompCountForm(value);
      setAcompanante(
        Array(parseInt(value)).fill({
          id: null,
          nombre: "",
          edad: null,
          id_titular: null,
          mascota: null,
        })
      );
      console.log("NUMERO DE ACOMPAÑANTES: ", acompCountForm - 1);
    }
  };
  //Almacena los datos digitados a setTitular
  const handleTitularChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === "id" ? parseInt(value) : value;
    setTitular((prevTitular) => ({ ...prevTitular, [name]: parsedValue }));
  };
  //Almacena los datos digitados en acompañante
  const handleAcomp = (e) => {
    const { name, value } = e.target;
    let parsedValue = value;
    if (name === "id" || name === "edad" || name === "mascota") {
      parsedValue = parseInt(value);
    }
    setAcompanante((prevAcompanante) => ({
      ...prevAcompanante,
      [name]: parsedValue,
    }));
  };
  //Almacenar el telefono del titular
  const handleTelefonoChange = (e) => {
    const { name, value } = e.target;
    setTelefono((prevTelefono) => ({ ...prevTelefono, [name]: value }));
    //console.log(telefo);
  };
  // condicional de si va a tomar o no servicios
  const handleReservaRadioButton = (e) => {
    setServiciosOption(e.target.value);
  };
  //setter el valor escogido en el combobox de hotel
  const handleChangeHotelBox = (e) => {
    setComboHotelOption(e.target.value); //almacena el valor
    setReserva((prevReserva) => ({
      ...prevReserva,
      id_hotel: parseInt(e.target.value),
    })); //se settea la foranea id_hotel en reserva
  };
  //setter de la fecha de inicio
  const handleFechaInicio = (e) => {
    setFechaInicio(e.target.value);
  };
  //setter de la fecha final
  const handleFechaFinal = (e) => {
    setFechaFinal(e.target.value);
  };
  //setter el valor escogido en el combobox de hotel
  const handlePertenece = (e) => {
    setPertenece(e.target.value); //almacena el valor
    //reserva.id_hotel = comboHotelOption
  };
  const handleAgencia = (e) => {
    const { name, value } = e.target;
    //setAgencia(e.target.value); //almacena el nombre de la agencia
    setAgencia((prevAgencia) => ({ ...prevAgencia, [name]: value }));
    //setTitular((prevTitular) => ({ ...prevTitular, id_agencia: parseInt(agencia.id) })); //settea la foranea de id_agencia en caso de pertenecer
    //console.log("Id de la agencia en titular: " + titular.id_agencia);
  };

  /*const handleAcompCountFormChange = (event) => {
    setAcompCountForm(parseInt(event.target.value));
    setAcompanantes([]);
  };*/

  const handleIdAcomp = (e, index) => {
    const { name, value } = e.target;
    const newValue =
      name === "id" ||
      name === "edad" ||
      name === "id_titular" ||
      name === "mascota"
        ? parseInt(value, 10)
        : value;
    const newAcompanantes = [...acompanante];
    newAcompanantes[index] = { ...newAcompanantes[index], [name]: newValue };
    newAcompanantes[index] = {
      ...newAcompanantes[index],
      id_titular: parseInt(titular.id),
    };
    setAcompanante(newAcompanantes);
  };

  const generarAcompForm = () => {
    const contenido = [];
    if (acompCountForm >= 2) {
      for (let i = 0; i < acompCountForm - 1; i++) {
        const datosAcompanante = acompanante[i] || {};
        contenido.push(
          <div key={i + 1}>
            <h3>Acompañante {i + 1}</h3>
            <label>
              Id del acompañante:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={`idAcomp${i + 1}`}
                type="number"
                name="id"
                placeholder="123123123"
                value={datosAcompanante.id || null}
                onChange={(e) => handleIdAcomp(e, i)}
              />
            </label>
            <label>
              Nombre:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={`nombreAcomp${i + 1}`}
                type="text"
                name="nombre"
                placeholder="Acompañante Juan"
                value={datosAcompanante.nombre || null}
                onChange={(e) => handleIdAcomp(e, i)}
              />
            </label>
            <label>
              Edad:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={`edadAcomp${i + 1}`}
                type="number"
                name="edad"
                placeholder="5 años"
                value={datosAcompanante.edad || null}
                onChange={(e) => handleIdAcomp(e, i)}
              />
            </label>
            <label>
              Es una mascota:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={`mascotaAcomp${i + 1}`}
                type="number"
                name="mascota"
                placeholder="1 -> SI | 0 -> NO"
                value={datosAcompanante.mascota || null}
                onChange={(e) => handleIdAcomp(e, i)}
              />
            </label>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={anclarTitular}
            >
              Anclar al titular
            </button>
          </div>
        );
      }
    }
    return contenido;
  };

  /*setAcompanante((prevAcompanante) => ({
    ...prevAcompanante,
    id_titular: titular.id,
  })); //Amacena el id del titular*/
  //Funcion para anclar el id_titular con el acompañante y mandarlo a la base de datos
  const anclarTitular = async () => {};

  //Funcion para enviar los datos a la base de datos
  const handleSubmit = async (e) => {
    e.preventDefault(); //Evitar que se recargue la pagina
    //Settear las claves foraneas
    //id_tituar telefono
    setTelefono((prevTelefono) => ({
      ...prevTelefono,
      id_titular: parseInt(titular.id),
    }));
    console.log("despues de submit: " + telefo.id_titular);
    console.log("despues de submit: " + telefo.telefono);
    //id_titular en acompañante

    //se settea e id_titular en reserva
    setReserva((prevReserva) => ({ ...prevReserva, id_titular: titular.id }));
    if (agencia.nombre !== null) {
      //Guarda el objeto agencia en un JSON para su envío
      try {
        const jsonAgencia = JSON.stringify(agencia);
        console.log("DATOS DE AGENCIA: ", jsonAgencia);
        await axios.post(
          "http://localhost:3001/Route/creaAgencia",
          jsonAgencia,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        //Traer el endpoint de agencia para traer la ultima agencia y tenerla en id_agencia de titular
        const response = await axios.get(
          "http://localhost:3001/Route/AllAgencia"
        );
        const agencias = response.data;
        //console.log("DATA DE AGENCIA: ", agencia);
        if (Array.isArray(agencias) && agencias.length > 0) {
          const lastAgencia = agencias[agencias.length - 1];
          console.log(lastAgencia);
          setTitular((prevTitular) => ({
            ...prevTitular,
            id_agencia: parseInt(lastAgencia.id),
          }));
          console.log("DATOS DEL TITULAR", titular);
        } else {
          console.log("La lista de agencia se encuetra vacía");
        }
        //Verificar el codigo de estado de la respuesta
        if (response.status === 200) {
          console.log("Se envió correctamente");
        } else {
          console.log("Error al enviar la reserva");
        }
      } catch (error) {
        console.error("Error al obtener la lista de agencia", error);
      }
    }
    //console.log(reserva);
    console.log(titular);

    enviarReserva();
    //router.push("/habitaciones");
  };

  const enviarReserva = async () => {
    try {
      const jsonReserva = JSON.stringify(reserva);
      console.log(jsonReserva);
      const jsonTitular = JSON.stringify(titular);
      console.log(jsonTitular);
      const jsonTelefono = JSON.stringify(telefo);
      console.log(jsonTelefono);

      let response = await axios.post(
        "http://localhost:3001/Route/creaTitular",
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
        "http://localhost:3001/Route/creaTelTitular",
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

      response = await axios.post(
        "http://localhost:3001/Route/creaReserva",
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

      const indexAcomp = [];
      acompanante.forEach((acomp) => {
        indexAcomp.push(acomp);
      });

      for (let i = 0; i < indexAcomp.length; i++) {
        let jsonAcomp = JSON.stringify(indexAcomp[i]);
        console.log(jsonAcomp);
        await axios.post(
          "http://localhost:3001/Route/creaAcompanante",
          jsonAcomp,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
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
        {generarAcompForm()}
        {pertenece === "true" && (
          <>
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
        {/*
          <Link href="/habitaciones" passHref>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Guardar Reserva
            </button>
          </Link>
        */}
      </form>
    </div>
  );
}

export default ReservaForm;
