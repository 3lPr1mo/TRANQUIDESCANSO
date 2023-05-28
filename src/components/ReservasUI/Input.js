const Input = () => {
  return (
    <div className="mt-10 relative w-80 mr-10">
      <input
        type="text"
        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Buscar reservas"
      />
    </div>
  );
};

export { Input };
