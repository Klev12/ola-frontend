import { Avatar } from "primereact/avatar";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { OverlayPanel as OverlayPanelType } from "primereact/overlaypanel";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { logout } from "../../../services/auth-service";
import ROUTES from "../../../consts/routes";

export default function AvatarDemo() {
  const op = useRef<OverlayPanelType>(null);
  const navigate = useNavigate();

  const { mutate: logoutMutate } = useMutation(logout, {
    onSuccess: () => {
      navigate(ROUTES.LOGIN);
    },
  });

  const handleCerrarSesion = () => {
    logoutMutate();
  };

  return (
    <div className="card">
      <div className="flex flex-wrap gap-5">
        <div className="flex-auto">
          <Avatar
            icon="pi pi-user"
            className="mr-2"
            size="normal"
            shape="circle"
            onClick={(e) => op.current?.toggle(e)}
            style={{ cursor: "pointer" }}
          />
          <OverlayPanel ref={op} dismissable>
            <div className="p-3">
              <Button
                label="Cerrar Sesión"
                className="p-button-text"
                onClick={handleCerrarSesion}
              />
            </div>
          </OverlayPanel>
        </div>
      </div>
    </div>
  );
}
