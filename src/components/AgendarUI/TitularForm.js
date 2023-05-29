import { useState } from "react";

const TitularForm = () => {
  const [showExtraInput, setShowExtraInput] = useState(false);
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

  const handleChangeAcomp = (e) => {
    const { name, value } = e.target;
    setAcomp((prevAcomp) => ({ ...prevAcomp, [name]: value }));
  };

  const handleChangeAgencia = (e) => {
    const { name, value } = e.target;
    setAgencia((prevAgencia) => ({ ...prevAgencia, [name]: value }));
  };

  const handleChangeTitular = (e) => {
    const { name, value } = e.target;
    setTitular((prevTitular) => ({ ...prevTitular, [name]: value }));
  };

  const handleChangeCombobox2 = (e) => {
    setShowExtraInput(e.target.value === "true");
  };

  return (
    <div>
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
    </div>
  );
};

export { TitularForm };
