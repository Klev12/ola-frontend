import { Button } from "primereact/button";
import Image from "../../assets/404_page_not_found_purple.png";
import { useNavigate } from "react-router";
import "../page-not-found/styles.css";
import ROUTES from "../../consts/routes";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(ROUTES.HOME.ME); // Cambia '/otra-ruta' por la ruta a la que quieres navegar
  };

  return (
    <div className="page-not-found-container">
      <img src={Image} alt="Page Not Found" className="page-not-found-image" />
      <div className="page-not-found-text">
        <h1 style={{ fontSize: 90, color: "purple" }}>Oppsss!</h1>
        <h2 style={{ fontSize: 45, color: "purple" }}>
          No podemos encontrar la página que estás buscando
        </h2>
        <p style={{ fontSize: 20 }}>
          La página a la que estas intentando ingresar no se encuentra, verifica
          si la URL está correcta.
        </p>
        <Button
          style={{ backgroundColor: "purple", border: 0, boxShadow: "none" }}
          label="Regresar"
          onClick={handleGoBack}
        />
      </div>
    </div>
  );
};

export default PageNotFound;
