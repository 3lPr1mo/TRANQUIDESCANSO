import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const FilterButton = ({serachedValue}) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("false");

  const toggleDropdow = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    console.log(serachedValue)
    setIsOpen(false)
    setSelectedOption(option);
    console.log(selectedOption)
    switch (selectedOption) {
      case 'Opción 1':
        router.push("/consultas/[id]",`/consultas/${selectedOption}`);
        break;
    
      case 'Opción 2':
        router.push(`/consultas/opcion2?id=${searchedValue}`);
        break;

      case 'Opción 3':
        router.push(`/consultas/opcion3?id=${searchedValue}`);
        break;
      
      case 'Opción 4':
        router.push(`/consultas/opcion4?id=${searchedValue}`);
        break;
      
      case 'Opción 5':
        router.push(`/consultas/opcion5?id=${searchedValue}`);
        break;
      
      case 'Opción 6':
        router.push(`/consultas/opcion6?id=${searchedValue}`);
        break;
      
      case 'Opción 7':
        router.push(`/consultas/opcion7?id=${searchedValue}`);
        break;
      
      default:
        break;
    }
  };

  return (
    <>
      <button
        className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md mr-2"
        onClick={toggleDropdow}
      >
        Filtrar
      </button>
      {isOpen && (
        <ul className="combobox-menu bg-white border border-gray-300 mt-1 py-1 rounded">
          <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleOptionSelect('Opción 1')}>Periodo de tiempo</li>
          <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleOptionSelect('Opción 2')}>Canceladas sin el 20%</li>
          <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleOptionSelect('Opción 3')}>No utilizadas y si 20%</li>
          <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleOptionSelect('Opción 4')}>Registro a tiempo</li>
          <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleOptionSelect('Opción 5')}>Menores de edad y/o mascotas</li>
          <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleOptionSelect('Opción 6')}>Servicios adicionales</li>
          <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleOptionSelect('Opción 7')}>Datos huespedes</li>
        </ul>
      )}
    </>
  );
};

export { FilterButton };
