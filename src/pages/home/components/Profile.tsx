import { Card } from "primereact/card";
import useGlobalState from "../../../store/store";
import CollaboratorButton from "./CollaboratorButton";

export const Profile = () => {
  const user = useGlobalState((state) => state.user);
  return (
    <div>
      <Card>
        <div>Usuario: {user?.fullname}.</div>
        <div>Correo: {user?.email}</div>
        <div>Rol: {user?.role}.</div>
        <div>Área: {user?.area}.</div>
        <CollaboratorButton />
      </Card>
    </div>
  );
};
