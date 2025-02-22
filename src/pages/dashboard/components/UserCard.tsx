import React, { useRef } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Link, useNavigate } from "react-router-dom";
import { confirmDialog } from "primereact/confirmdialog";
import { useMutation, useQuery } from "react-query";
import ROUTES from "../../../consts/routes";
import useGlobalState from "../../../store/store";
import { Roles, UserArea, UserGetDto } from "../../../models/user";
import {
  changeRole,
  deleteUserById,
  patchUser,
} from "../../../services/user-service";
import useToggle from "../../../hooks/useToggle";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import SelectUserArea from "../../../components/SelectUserArea";

import translatedRoles from "../../../consts/translations/roles-translation";
import { AxiosError } from "axios";
import {
  Building,
  CircleCheckBig,
  FileText,
  Mail,
  Pencil,
  Trash2,
  User,
  Users,
  X,
} from "lucide-react";

interface UserCardProps {
  user: UserGetDto;
  notificationMode?: boolean;
  onSuccessEdit?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onSuccessEdit }) => {
  const toast = useRef<Toast>(null);

  const showSuccess = () => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: "El cambio de rol ha sido exitoso",
      life: 3000,
    });
  };

  const { refetch } = useQuery({ queryKey: ["users"] });
  const { mutate: deleteUserByIdMutate } = useMutation(deleteUserById, {
    onSuccess: () => {
      refetch();
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "El usuario ha sido eliminado",
        life: 3000,
      });
    },
    onError: () => {
      toast.current?.show({
        severity: "error",
        summary: "Errror",
        detail: "Hubo un error al eliminar el usuario",
        life: 3000,
      });
    },
  });

  const { mutate: patchUserMutate, isLoading: updatingUser } = useMutation(
    patchUser,
    {
      onSuccess: () => {
        toast.current?.show({
          severity: "success",
          summary: "Datos de usuario actualizado",
        });
        if (onSuccessEdit) onSuccessEdit();
        showEditMenu.setFalse();
      },
    }
  );

  const { mutate: changeRoleMutate } = useMutation(
    ({ role, userId }: { role: Roles; userId: number }) =>
      changeRole(role, userId),
    {
      onSuccess: () => {
        showSuccess();
      },
      onError: (error: AxiosError<{ error?: { message?: string } }>) => {
        const message = error.response?.data.error?.message;
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: message,
        });
      },
    }
  );

  const authenticatedUser = useGlobalState((state) => state.user);

  const navigate = useNavigate();

  const showEditMenu = useToggle();

  return (
    <>
      <Toast ref={toast} />
      <div className="outline-1 outline-gray-200 rounded-md p-6">
        <div className="flex gap-2 items-baseline justify-between mb-4">
          <span className="text-2xl font-semibold">{user.fullname}</span>
          <span className="font-thin text-base text-gray-500">
            #{user.code}
          </span>
        </div>
        <div className="grid gap-3 mb-7 text-gray-800">
          <div className="flex items-center gap-2">
            <Mail size={16} />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Building size={16} />
            <span>{user.area}</span>
          </div>
          <div
            className={`flex items-center gap-2 ${
              user.verified ? "text-green-600" : "text-red-600"
            }`}
          >
            {user.verified ? (
              <CircleCheckBig className="" size={16} />
            ) : (
              <X className="" size={16} />
            )}
            <span> {user.verified ? "verificado" : "no verificado"}</span>
          </div>
          <div className="flex items-center gap-2">
            <User size={16} />
            <form
              className="flex gap-5"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = Object.fromEntries(
                  new FormData(e.target as HTMLFormElement)
                );

                changeRoleMutate({
                  role: formData["role"] as Roles,
                  userId: user.id as number,
                });
              }}
            >
              <select name="role" defaultValue={user.role}>
                {Object.entries(Roles).map(([, value]) => (
                  <option
                    id={value}
                    value={value}
                    label={translatedRoles[value]}
                  />
                ))}
              </select>
              <button className="outline-1 outline-gray-300 rounded-sm p-2 text-sm font-bold cursor-pointer hover:bg-gray-200">
                Cambiar rol
              </button>
            </form>
          </div>
        </div>
        <div className="flex gap-2 items-center justify-between">
          <button
            className="outline-1 outline-gray-300 p-2 rounded-sm cursor-pointer hover:bg-gray-200"
            onClick={() => showEditMenu.setTrue()}
          >
            <Pencil size={16} />
          </button>
          {authenticatedUser?.role !== Roles.secretary && (
            <button
              className="outline-1 outline-gray-300 p-2 rounded-sm cursor-pointer hover:bg-gray-200"
              onClick={() => {
                confirmDialog({
                  message:
                    "¿Estás seguro de que quieres eliminar este usuario?",
                  header: "Confirmar eliminación",
                  icon: "pi pi-exclamation-triangle",
                  draggable: false,
                  accept: () => deleteUserByIdMutate(user.id),
                });
              }}
            >
              <Trash2 size={16} />
            </button>
          )}

          {[
            Roles.admin,
            Roles.secretary,
            Roles.generalAdmin,
            Roles.groupAdmin,
          ].includes(user.role) && (
            <button
              className="outline-1 outline-gray-300 p-2 rounded-sm cursor-pointer hover:bg-gray-200"
              onClick={() => {
                navigate(ROUTES.DASHBOARD.USER_TEAMS_ID(user.id), {
                  state: user,
                });
              }}
            >
              <Users size={16} />
            </button>
          )}

          <Link
            to={ROUTES.DASHBOARD.CHECK_USER_FORM_ID(user.id as number)}
            className="outline-1 outline-gray-300 p-2 rounded-sm hover:bg-gray-200"
          >
            <FileText size={16} />
          </Link>
        </div>
      </div>
      <Dialog
        visible={showEditMenu.value}
        onHide={() => showEditMenu.setFalse()}
      >
        <form
          action=""
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          onSubmit={(e) => {
            e.preventDefault();
            const formData = Object.fromEntries(
              new FormData(e.target as HTMLFormElement)
            );

            patchUserMutate({
              user: {
                email: formData["email"].toString(),
                fullname: formData["fullname"].toString(),
                area: formData["area"].toString() as UserArea,
                userId: user.id as number,
              },
            });
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <label htmlFor="">Nombre completo</label>
            <InputText defaultValue={user.fullname} name="fullname" />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <label htmlFor="">Email</label>
            <InputText defaultValue={user.email} name="email" />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <label htmlFor="">Área</label>
            <SelectUserArea defaultArea={user.area} />
          </div>
          <div></div>
          <Button
            label="Subir cambios"
            loading={updatingUser}
            disabled={updatingUser}
          />
        </form>
      </Dialog>
    </>
    // <Panel
    //   collapsed={true}
    //   header={
    //     <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
    //       <span>{user.fullname}</span>
    //       <Tag severity="info" value={user.code} />
    //       {[
    //         Roles.admin,
    //         Roles.secretary,
    //         Roles.generalAdmin,
    //         Roles.groupAdmin,
    //       ].includes(user.role) && (
    //         <Tag
    //           value="ver grupo"
    //           style={{ cursor: "pointer" }}
    //           onClick={() => {
    //             navigate(ROUTES.DASHBOARD.USER_TEAMS_ID(user.id), {
    //               state: user,
    //             });
    //           }}
    //         />
    //       )}
    //     </div>
    //   }
    // >
    //   <Toast ref={toast} />

    //   {user.role !== Roles.admin &&
    //     authenticatedUser?.role !== Roles.secretary && <></>}

    //   <div>Email: {user.email}</div>
    //   <div>Area: {user.area}</div>
    //   <div style={{ gap: "0.5rem" }}>
    //     verificación:
    //     {user.verified
    //       ? "el usuario está verificado"
    //       : "el usuario no está verificado"}
    //     <Link to={ROUTES.DASHBOARD.CHECK_USER_FORM_ID(user.id as number)}>
    //       Revisar formulario
    //     </Link>
    //   </div>
    //   <div>
    //     {!notificationMode && (
    //       <form
    //         onSubmit={(e) => {
    //           e.preventDefault();
    //           const formData = Object.fromEntries(
    //             new FormData(e.target as HTMLFormElement)
    //           );

    //           changeRoleMutate({
    //             role: formData["role"] as Roles,
    //             userId: user.id as number,
    //           });
    //         }}
    //       >
    //         <span>Rol: {user.role}</span>
    //         <select name="role" defaultValue={user.role}>
    //           {Object.entries(Roles).map(([, value]) => (
    //             <option
    //               id={value}
    //               value={value}
    //               label={translatedRoles[value]}
    //             />
    //           ))}
    //         </select>

    //         <div style={{ display: "flex", justifyContent: "space-between" }}>
    //           <Button label="Cambiar Rol" />
    //           {authenticatedUser?.role !== Roles.secretary && (
    //             <Button
    //               style={{
    //                 backgroundColor: "red",
    //                 border: 0,
    //                 boxShadow: "none",
    //               }}
    //               rounded
    //               type="button"
    //               label="Eliminar usuario"
    //               onClick={confirmDelete}
    //             />
    //           )}
    //         </div>
    //       </form>
    //     )}
    //   </div>
    //   <Button
    //     icon={PrimeIcons.PENCIL}
    //     outlined
    //     label="editar"
    //     onClick={() => showEditMenu.setTrue()}
    //   />
    //   <Dialog
    //     visible={showEditMenu.value}
    //     onHide={() => showEditMenu.setFalse()}
    //   >
    //     <form
    //       action=""
    //       style={{ display: "flex", flexDirection: "column", gap: "10px" }}
    //       onSubmit={(e) => {
    //         e.preventDefault();
    //         const formData = Object.fromEntries(
    //           new FormData(e.target as HTMLFormElement)
    //         );

    //         patchUserMutate({
    //           user: {
    //             email: formData["email"].toString(),
    //             fullname: formData["fullname"].toString(),
    //             area: formData["area"].toString() as UserArea,
    //             userId: user.id as number,
    //           },
    //         });
    //       }}
    //     >
    //       <div
    //         style={{ display: "flex", flexDirection: "column", gap: "10px" }}
    //       >
    //         <label htmlFor="">Nombre completo</label>
    //         <InputText defaultValue={user.fullname} name="fullname" />
    //       </div>
    //       <div
    //         style={{ display: "flex", flexDirection: "column", gap: "10px" }}
    //       >
    //         <label htmlFor="">Email</label>
    //         <InputText defaultValue={user.email} name="email" />
    //       </div>
    //       <div
    //         style={{ display: "flex", flexDirection: "column", gap: "10px" }}
    //       >
    //         <label htmlFor="">Área</label>
    //         <SelectUserArea defaultArea={user.area} />
    //       </div>
    //       <div></div>
    //       <Button
    //         label="Subir cambios"
    //         loading={updatingUser}
    //         disabled={updatingUser}
    //       />
    //     </form>
    //   </Dialog>
    // </Panel>
  );
};

export default UserCard;
