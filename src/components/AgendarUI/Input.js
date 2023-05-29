const Input = () => {
  return (
    <div className="relative w-32 mr-10">
      <input
        type="number"
        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="id reserva"
      />
    </div>
  );
};

export { Input };
