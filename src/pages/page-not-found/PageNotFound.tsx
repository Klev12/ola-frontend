import { Button } from "primereact/button";
import { useNavigate } from "react-router";
import "../page-not-found/styles.css";
import ROUTES from "../../consts/routes";
import error from "../../assets/error.svg";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(ROUTES.HOME.ME);
  };

  return (
    <div className="page-not-found-container">
      <img src={error} alt="Page Not Found" className="page-not-found-image" />
      <div className="page-not-found-text">
        <div style={{ fontSize: 90, color: "#673AB7" }}>Oppsss!</div>
        <div style={{ fontSize: 45, color: "#673AB7" }}>
          No podemos encontrar la página que estás buscando
        </div>
        <p style={{ fontSize: 20 }}>
          La página a la que estás intentando ingresar no se encuentra, verifica
          si la URL está correcta.
        </p>
        <Button
          style={{ border: 0, boxShadow: "none" }}
          label="Regresar"
          onClick={handleGoBack}
        />
      </div>
    </div>
  );
};

export default PageNotFound;
