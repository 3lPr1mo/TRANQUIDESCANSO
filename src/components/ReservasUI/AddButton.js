import Link from "next/link";

const AddButton = () => {
  return (
    <Link className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-md" href="/agendar">
      Añadir
    </Link>
  );
};

export {AddButton}