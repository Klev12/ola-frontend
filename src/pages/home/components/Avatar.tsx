import { Avatar } from "primereact/avatar";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { OverlayPanel as OverlayPanelType } from "primereact/overlaypanel";
import { useRef } from "react";

export default function AvatarDemo() {
  const op = useRef<OverlayPanelType>(null);

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
                label="Ver Perfil"
                className="p-button-text"
                onClick={() => console.log("Ver Perfil")}
              />
              <Button
                label="Cerrar Sesión"
                className="p-button-text"
                onClick={() => console.log("Cerrar Sesión")}
              />
            </div>
          </OverlayPanel>
        </div>
      </div>
    </div>
  );
}
