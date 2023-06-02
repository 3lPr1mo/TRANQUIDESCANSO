import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";

const ConsultaPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [periodoData, setPeriodoData] = useState([]);

  useEffect(() => {
    const tryFetch = async () => {
      switch (id) {
        case "Opción 1":
          try {
            const response = await axios.get(
              "http://localhost:3001/Route/TiempoP/2022-01-01/2023-07-01"
            );
            const data = response.data;
            setPeriodoData(data);
          } catch (error) {
            console.error(error);
          }
          break;

        case "Opción 2":
          try {
            const response = await axios.get(
              "http://localhost:3001/Route/Canceladas"
            );
            const data = response.data;
            setPeriodoData(data);
          } catch (error) {
            console.error(error);
          }
          break;

        case "Opción 3":
          try {
            const response = await axios.get(
              "http://localhost:3001/Route/NoUtili"
            );
            const data = response.data;
            setPeriodoData(data);
          } catch (error) {
            console.error(error);
          }
          break;

        case "Opción 4":
          try {
            const response = await axios.get(
              "http://localhost:3001/Route/TiempoP/RegistroTime"
            );
            const data = response.data;
            setPeriodoData(data);
          } catch (error) {
            console.error(error);
          }
          break;

        case "Opción 5":
          try {
            const response = await axios.get(
              "http://localhost:3001/Route/TiempoP/MenorMasco"
            );
            const data = response.data;
            setPeriodoData(data);
          } catch (error) {
            console.error(error);
          }
          break;

        case "Opción 6":
          try {
            const response = await axios.get(
              "http://localhost:3001/Route/TiempoP/ServiciosAd"
            );
            const data = response.data;
            setPeriodoData(data);
          } catch (error) {
            console.error(error);
          }
          break;

        case "Opción 7":
          try {
            const response = await axios.get(
              "http://localhost:3001/Route/TiempoP/HuespedesTitu/2"
            );
            const data = response.data;
            setPeriodoData(data);
          } catch (error) {
            console.error(error);
          }
          break;

        default:
          break;
      }
    };
    tryFetch();
  });

  return (
    <div>
      <h1>Página de consulta</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha inicio</th>
            <th>Fecha fin</th>
          </tr>
        </thead>
        <tbody>
          {periodoData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.fecha_inic}</td>
              <td>{item.fecha_fin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultaPage;
