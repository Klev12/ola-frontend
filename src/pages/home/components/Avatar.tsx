import { Avatar } from "primereact/avatar";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { OverlayPanel as OverlayPanelType } from "primereact/overlaypanel";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AvatarDemo() {
  const op = useRef<OverlayPanelType>(null);
  const navigate = useNavigate();

  const handleCerrarSesion = async () => {
    if (op.current) {
      op.current.hide();
    }

    try {
      const response = await axios.get("/api/logout", {
        withCredentials: true,
      });

      if (response.status === 200) {
        navigate("/login");
      } else {
        console.error("Error al cerrar sesión");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
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
