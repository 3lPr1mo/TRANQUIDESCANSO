import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const [singUpUsername, setSingUpUsername] = useState("");
  const [singUpPassword, setSingUpPassword] = useState("");

  const handleSingupSubmit = (e) => {
    e.preventDefault();
    //Logica para el registro
  };

  return (
    <div className="flex flex-col content-center h-screen justify-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-700">REGISTER FORM</h1>
      </div>
      <div className="flex justify-center items-center">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSingupSubmit}
        >
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username:
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={singUpUsername}
              onChange={(e) => setSingUpUsername(e.target.value)}
            />
          </label>
          <br />
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password:
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              value={singUpPassword}
              onChange={(e) => setSingUpPassword(e.target.value)}
            />
          </label>
          <br />
          <div className="flex items-center justify-between">
            <Link
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              href="/"
            >
              Sing Up
            </Link>
            <Link
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              href="/"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
