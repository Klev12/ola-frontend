import { Button } from "primereact/button";
import ROUTES from "../../../consts/routes";
import useGlobalState from "../../../store/store";

const CollaboratorButton = () => {
  const authenticatedUser = useGlobalState((state) => state.user);
  return (
    <div>
      <label htmlFor="">Añadir colaborador (comparte el siguiente link)</label>
      <div>
        <a
          href={`${window.location.host}${ROUTES.SIGNUP}/${authenticatedUser?.code}`}
          target="_blank"
        >
          {`${window.location.host}${ROUTES.SIGNUP}/${authenticatedUser?.code}`}
        </a>
        <Button label="copiar" />
      </div>
    </div>
  );
};

export default CollaboratorButton;
