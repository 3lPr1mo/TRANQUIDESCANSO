import { useRouter } from "next/router";

const ConsultaPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Página de consulta con ID: {id}</h1>
      {/* Resto del contenido de la página */}
    </div>
  );
};

export default ConsultaPage;
