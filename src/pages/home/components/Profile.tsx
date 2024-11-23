import { Card } from "primereact/card";
import useGlobalState from "../../../store/store";

import { Button } from "primereact/button";
import { useNavigate } from "react-router";
import ROUTES from "../../../consts/routes";

interface ProfileProps {
  onChangePassword?: () => void;
}

export const Profile = ({ onChangePassword }: ProfileProps) => {
  const user = useGlobalState((state) => state.user);
  const navigate = useNavigate();

  return (
    <div>
      <Card>
        <div>
          <span style={{ fontWeight: "bold" }}>Usuario:</span> {user?.fullname}.
        </div>
        <div>
          <span style={{ fontWeight: "bold" }}>Código:</span> {user?.code}
        </div>
        <div>
          <span style={{ fontWeight: "bold" }}>Correo:</span> {user?.email}
        </div>
        <div>
          <span style={{ fontWeight: "bold" }}>Rol:</span> {user?.role}.
        </div>
        <div>
          <span style={{ fontWeight: "bold" }}>Área:</span> {user?.area}.
        </div>

        <Button
          style={{ marginTop: "10px" }}
          label="Cambiar contraseña"
          onClick={() => {
            navigate(ROUTES.CHANGE_OWN_PASSWORD.ME);
            if (onChangePassword) onChangePassword();
          }}
        />
      </Card>
    </div>
  );
};
