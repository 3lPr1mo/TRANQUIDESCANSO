function Habitaciones() {
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
