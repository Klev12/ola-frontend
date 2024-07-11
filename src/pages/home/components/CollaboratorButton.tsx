import { Button } from "primereact/button";
import ROUTES from "../../../consts/routes";
import useGlobalState from "../../../store/store";
import { Toast } from "primereact/toast";
import { useRef } from "react";

const CollaboratorButton = () => {
  const authenticatedUser = useGlobalState((state) => state.user);
  const toast = useRef<Toast>(null);
  const link = `${window.location.host}${ROUTES.SIGNUP}/${authenticatedUser?.code}`;
  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link).then(() => {
        toast.current?.show({
          severity: "success",
          summary: "Copiado",
          detail: "El enlace ha sido copiado.",
          life: 4000,
        });
      });
    }
  };
  return (
    <div>
      <Toast ref={toast} />
      <label htmlFor="">Añadir colaborador (comparte el siguiente link)</label>
      <div>
        <a href={link}>{link}</a>
        <Button
          icon="pi pi-copy"
          className="p-button-rounded p-button-info p-mr-2"
          onClick={copyToClipboard}
        />
      </div>
    </div>
  );
};

export default CollaboratorButton;
