import { Disclosure } from "@headlessui/react";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  MdOutlineSpaceDashboard,
  MdOutlineAnalytics,
  MdOutlineIntegrationInstructions,
  MdOutlineMoreHoriz,
  MdOutlineSettings,
  MdOutlineLogout,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaRegComments } from "react-icons/fa";
import { BiMessageSquareDots } from "react-icons/bi";
import Link from "next/link";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Disclosure>
        <Disclosure.Button
          className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-insert focus:rind-white group hover:bg-gray-900"
          onClick={toggleSidebar}
        >
          <GiHamburgerMenu
            className="block md:hidden h-6 w-6"
            aria-hidden="true"
          />
        </Disclosure.Button>
        <Disclosure.Panel
          className={`p-6 w-1/2 h-screen bg-white z-20 fixed top-0 -left-96 lg:w-60 lg:left-0 peer-focus:left-0 peer:transition ease-out delay-150 duration-200 ${
            isOpen ? "left-0" : ""
          }`}
        >
          <div className="flex flex-col justify-start items-center">
            <h1 className="text-base text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4 w-full">
              TRANQUIDESCANSO S.A.
            </h1>
            <div className="my-4 border-b w-full border-gray-100 pb-4">
              <Link
                className="flex mb-2 justify-start items-center gap-4 px-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
                type="button"
                href="/home"
              >
                <CgProfile className="text-2xl text-gray-600 group-hover:text-white" />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                  Profile
                </h3>
              </Link>
              <Link
                className="flex mb-2 justify-start items-center gap-4 px-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
                type="button"
                href="/reservas"
              >
                <MdOutlineSpaceDashboard className="text-2xl text-gray-600 group-hover:text-white" />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                  Reservas
                </h3>
              </Link>
              <Link
                className="flex mb-2 justify-start items-center gap-4 px-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
                type="button"
                href="/home"
              >
                <MdOutlineAnalytics className="text-2xl text-gray-600 group-hover:text-white" />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                  Hoteles
                </h3>
              </Link>
              <Link
                className="flex mb-2 justify-start items-center gap-4 px-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
                type="button"
                href="/home"
              >
                <MdOutlineIntegrationInstructions className="text-2xl text-gray-600 group-hover:text-white" />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                  Agencias
                </h3>
              </Link>
            </div>
            <div className="my-4 w-full border-b border-gray-200 pb-4">
              <Link
                className="flex mb-2 justify-start items-center gap-4 px-5 border-gray-300 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
                type="button"
                href="/home"
              >
                <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white" />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                  Logout
                </h3>
              </Link>
            </div>
          </div>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  );
}

export default Sidebar;
