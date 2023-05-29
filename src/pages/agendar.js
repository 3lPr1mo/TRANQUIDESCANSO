import { Input } from "@/components/AgendarUI/Input";
import axios from "axios";
import { useEffect, useState } from "react";

function ReservaForm() {
  const [selectedOption, setSelectedOption] = useState("");
  const [showExtraInput, setShowExtraInput] = useState(false);
  const [reserva, setReserva] = useState({
    numero: "",
    habitaciones: "",
    personas: "",
    fechaInicio: "",
    fechaFin: "",
    valor: "",
    valorServicios: "",
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

  const [agencia, setAgencia] = useState({
    id: "",
    nombre: "",
  });

  const [acomp, setAcomp] = useState({
    id: "",
    nombre: "",
    edad: "",
    id_titular: "",
    mascota: "",
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

  const handleChangeCombobox2 = (e) => {
    const selectedOption = e.target.value === "true";
    setShowExtraInput(selectedOption);
    if (!selectedOption) {
      setTitular((prevTitular) => ({
        ...prevTitular,
        id_Agencia: '',
      }));
      setAgencia({id: '', nombre: ''})
    } else {
      setAcomp({ id: '', nombre: '', edad: '', id_titular: '', mascota: '' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReserva((prevReserva) => ({ ...prevReserva, [name]: value }));
  };

  const handleChangeTitular = (e) => {
    const { name, value } = e.target;
    setTitular((prevTitular) => ({ ...prevTitular, [name]: value }));
  };

  const handleChangeTelefono = (e) => {
    const { name, value } = e.target;
    setTelefonos((prevTelefono) => ({ ...prevTelefono, [name]: value }));
  };

  const handleChangeAcomp = (e) => {
    const { name, value } = e.target;
    setAcomp((prevAcomp) => ({ ...prevAcomp, [name]: value }));
  };

  const handleChangeAgencia = (e) => {
    const { name, value } = e.target;
    setAgencia((prevAgencia) => ({ ...prevAgencia, [name]: value }));
  };

  const handleChangeCombobox = (e) => {
    setSelectedOption(e.target.value); // Actualizar el estado cuando se selecciona una opción
    //reserva.hotel = selectedOption;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    submitTitular()
    //Si no pertenece a una agencia y trae acompañante
    if(!showExtraInput && acomp){
      submitAcomp() //Enviar datos de acompañante
    }else if(showExtraInput){ //Si pertenece a una agencia
      submitAgencia() //Enviar datos de agencia
    }

    //Enviar datos de reserva
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

  const submitTitular = () => {
    axios
      .post("http://localhost:3001/Route/creaUser", titular)
      .then((response) => {
        console.log("Reserva creada:", response.data);
        // Realizar alguna acción adicional si es necesario
      })
      .catch((error) => {
        console.error("Error al crear la reserva:", error);
        // Manejar el error de alguna manera
      });
  }
  const submitAgencia = () => {
    axios
      .post("http://localhost:3001/Route/creaAgencia", agencia)
      .then((response) => {
        console.log("Reserva creada:", response.data);
        // Realizar alguna acción adicional si es necesario
      })
      .catch((error) => {
        console.error("Error al crear la reserva:", error);
        // Manejar el error de alguna manera
      });
  }
  const submitAcomp = () => {
    axios
      .post("http://localhost:3001/Route/creaAcompanante", acomp)
      .then((response) => {
        console.log("Reserva creada:", response.data);
        // Realizar alguna acción adicional si es necesario
      })
      .catch((error) => {
        console.error("Error al crear la reserva:", error);
        // Manejar el error de alguna manera
      });
  }

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
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="numero"
            >
              Id del titular:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="idTitular"
              type="number"
              name="id"
              placeholder="digita un número"
              value={titular.id}
              onChange={handleChangeTitular}
            />
          </div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nombre:
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nombreTitular"
              type="text"
              name="nombre"
              placeholder="digita un nombre"
              value={titular.nombre}
              onChange={handleChangeTitular}
            />
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Direccion:
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="direccion"
              type="text"
              name="direccion"
              placeholder="digita un número"
              value={titular.direccion}
              onChange={handleChangeTitular}
            />
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Telefono:
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="direccion"
              type="text"
              name="telefono"
              placeholder="digita un número"
              value={telefonos.telefono}
              onChange={handleChangeTelefono}
            />
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ¿Pertenece a alguna agencia?:
            <select
              id="combo2"
              value={showExtraInput}
              onChange={handleChangeCombobox2}
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
          {showExtraInput && (
            <>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Agencia:
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="id_Agencia"
                  type="number"
                  name="id_Agencia"
                  placeholder="digita id de agencia"
                  value={titular.id_Agencia}
                  onChange={handleChangeTitular}
                />
              </label>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nombre de agencia:
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="nombreAgencia"
                  type="text"
                  name="nombre"
                  placeholder="Agencia"
                  value={agencia.nombre}
                  onChange={handleChangeAgencia}
                />
              </label>
            </>
          )}
          {!showExtraInput && (
            <>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Id del acompañante:
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="id_Acomp"
                  type="number"
                  name="id"
                  placeholder="Id"
                  value={acomp.id}
                  onChange={handleChangeAcomp}
                />
              </label>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nombre de acompañante:
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="nombreAcomp"
                  type="text"
                  name="nombre"
                  placeholder="Nombre acompañante"
                  value={acomp.nombre}
                  onChange={handleChangeAcomp}
                />
              </label>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Edad:
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="edadAcomp"
                  type="number"
                  name="edad"
                  placeholder="Edad"
                  value={acomp.edad}
                  onChange={handleChangeAcomp}
                />
              </label>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Id Titular:
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="idAcompTit"
                  type="number"
                  name="id_titular"
                  placeholder="Id Titular"
                  value={titular.id}
                  onChange={handleChangeAcomp}
                />
              </label>
            </>
          )}
        </div>
        <h3 className="text-gray-700 text-sm font-bold mb-2 mt-10">
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
              value={titular.nombre}
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
