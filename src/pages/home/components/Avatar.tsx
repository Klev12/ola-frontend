import { Avatar } from "primereact/avatar";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { OverlayPanel as OverlayPanelType } from "primereact/overlaypanel";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { logout } from "../../../services/auth-service";
import ROUTES from "../../../consts/routes";
import useGlobalState from "../../../store/store";
import { Dialog } from "primereact/dialog";
import { Profile } from "./Profile";

export default function AvatarDemo() {
  const op = useRef<OverlayPanelType>(null);
  const user = useGlobalState((state) => state.user);
  const navigate = useNavigate();

  const { mutate: logoutMutate } = useMutation(logout, {
    onSuccess: () => {
      navigate(ROUTES.LOGIN);
    },
  });

  const handleCerrarSesion = () => {
    logoutMutate();
  };

  const getInitials = (fullName: string) => {
    const names = fullName.split(" ");
    const intials = names.map((name) => name.charAt(0).toUpperCase());
    return intials.slice(0, 2).join("");
  };

  const [visible, setVisible] = useState(false);
  const handleViewProfile = () => {
    setVisible(true);
    op.current?.hide();
  };

  return (
    <div className="card">
      <div className="flex flex-wrap gap-5">
        <div className="flex-auto">
          <Avatar
            label={user?.fullname ? getInitials(user.fullname) : ""}
            className="mr-2"
            size="normal"
            shape="circle"
            onClick={(e) => op.current?.toggle(e)}
            style={{
              cursor: "pointer",
              backgroundColor: "#9c27b0",
              color: "white",
            }}
          />
          <OverlayPanel ref={op} dismissable>
            <Link to="#" onClick={handleViewProfile}>
              Ver perfil
            </Link>
            <div className="p-3">
              <Button
                style={{ color: "purple" }}
                label="Cerrar Sesión"
                className="p-button-text"
                onClick={handleCerrarSesion}
              />
            </div>
          </OverlayPanel>
          <Dialog
            draggable={false}
            header="Perfil de usario"
            visible={visible}
            onHide={() => setVisible(false)}
          >
            <Profile onChangePassword={() => setVisible(false)} />
          </Dialog>
        </div>
      </div>
    </div>
  );
}
