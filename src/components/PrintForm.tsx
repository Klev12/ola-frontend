import { ScrollPanel } from "primereact/scrollpanel";
import { UserFormGetDto } from "../models/user-form";
import FormGroupList from "../pages/user-form/components/FormGroupList";
import { AllResultPutDto, ResultPutDto } from "../models/result";
import { Button } from "primereact/button";
import { MouseEventHandler, ReactNode, useEffect, useRef } from "react";
import { useMutation } from "react-query";
import { verifyUserForm } from "../services/user-service";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import useGlobalState from "../store/store";
import ROUTES from "../consts/routes";
import { InputSwitch } from "primereact/inputswitch";
import { UserGetDto } from "../models/user";
import "../components/styles/input-switch.css";

interface PrintFormProps {
  form?: UserFormGetDto;
  onSubmit: (data: AllResultPutDto) => void;
  isLoading?: boolean;
  isFormEditable?: boolean;
  normalMode?: boolean;
  disableButton?: boolean;
  children?: ReactNode;
  user?: UserGetDto;
  refetchUser: () => void;
}

const PrintForm = ({
  form,
  onSubmit,
  isLoading,
  normalMode = true,
  disableButton = false,
  children,
  user,
}: PrintFormProps) => {
  const { mutate: verifyUserFormMutate } = useMutation(verifyUserForm);
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);
  const isFormEditable = useGlobalState((state) => state.isFormEditable);
  const setIsFormEditable = useGlobalState((state) => state.setIsFormEditable);

  const acceptFormUser: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    verifyUserFormMutate(form?.user_form.user_id as number);
  };

  const handleClick = () => {
    console.log("hello");
    if (normalMode) {
      navigate(ROUTES.SALES.PDF_ID(form?.form?.id as number));

      return;
    }
    navigate(ROUTES.FORM_PDF.ID(form?.user_form.user_id as number));
  };

  useEffect(() => {
    if (normalMode) {
      setIsFormEditable(false);
      return;
    }
    setIsFormEditable(true);
  }, [setIsFormEditable]);

  return (
    <ScrollPanel>
      <h2>
        {form?.form_scheme?.label} {user?.fullname} {user?.email}
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = Object.fromEntries(
            new FormData(e.target as HTMLFormElement)
          );

          const results: ResultPutDto[] = Object.keys(formData).map((key) => {
            console.log(normalMode, form);
            if (normalMode) {
              return {
                field_id: Number(key),
                form_id: form?.form?.id,
                response: {
                  value: formData[key],
                },
              } as ResultPutDto;
            }

            return {
              field_id: Number(key),
              form_id: form?.user_form.id,
              response: {
                value: formData[key],
              },
            } as ResultPutDto;
          });

          if (normalMode) {
            onSubmit({ id: form?.form?.id as number, results });
            return;
          }

          onSubmit({ id: form?.user_form.id as number, results });
        }}
      >
        <FormGroupList formGroups={form?.form_scheme.form_groups} />
        <nav
          className="nav-user-form"
          style={{
            position: "fixed",
            zIndex: 2,
            bottom: 0,
            right: 0,
          }}
        >
          {!disableButton && (
            <div className="edition-menu">
              <label htmlFor="">
                Modo edición {isFormEditable ? "desactivado" : "activado"}
              </label>
              <InputSwitch
                className="custom-input-switch"
                checked={!isFormEditable as boolean}
                onChange={(e) => setIsFormEditable(!e.value)}
              />
            </div>
          )}

          {!disableButton && (
            <Button
              style={{
                backgroundColor: "purple",
                border: 0,
                boxShadow: "none",
              }}
              label="Subir cambios"
              loading={isLoading}
              disabled={isLoading || isFormEditable}
            />
          )}

          {children && children}

          {!disableButton && (
            <>
              <Button
                style={{
                  backgroundColor: "purple",
                  border: 0,
                  boxShadow: "none",
                }}
                label={
                  user?.verified
                    ? user?.is_form_verified
                      ? "El usuario ya ha sido aceptado"
                      : "Aceptar formulario de ingreso"
                    : "El usuario no esta verificado"
                }
                loading={isLoading}
                disabled={isLoading || !isFormEditable || !user?.verified}
                onClick={acceptFormUser}
                icon={user?.is_form_verified ? "pi pi-check" : ""}
              />
            </>
          )}

          {!disableButton && (
            <>
              <Toast ref={toast} />
              <Button
                style={{ backgroundColor: "purple", border: 0 }}
                label="Ver PDF"
                type="button"
                onClick={handleClick}
              />
            </>
          )}
        </nav>
      </form>
    </ScrollPanel>
  );
};

export default PrintForm;
