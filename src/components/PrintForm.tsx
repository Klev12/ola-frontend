import { ScrollPanel } from "primereact/scrollpanel";
import { UserFormGetDto } from "../models/user-form";
import FormGroupList from "../pages/user-form/components/FormGroupList";
import { AllResultPutDto, ResultPutDto } from "../models/result";
import { Button } from "primereact/button";
import { MouseEventHandler, useEffect, useRef } from "react";
import { useMutation } from "react-query";
import { verifyUserForm } from "../services/user-service";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import useGlobalState from "../store/store";

interface PrintFormProps {
  form?: UserFormGetDto;
  onSubmit: (data: AllResultPutDto) => void;
  isLoading?: boolean;
  isFormEditable?: boolean;
}

const PrintForm = ({ form, onSubmit, isLoading }: PrintFormProps) => {
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
    navigate("/user-form/form-pdf");
  };

  useEffect(() => {
    setIsFormEditable(true);
  }, [setIsFormEditable]);

  return (
    <ScrollPanel>
      <h2>{form?.form_scheme?.label}</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = Object.fromEntries(
            new FormData(e.target as HTMLFormElement)
          );

          const results: ResultPutDto[] = Object.keys(formData).map((key) => {
            return {
              field_id: Number(key),
              form_id: form?.user_form.id,
              response: {
                value: formData[key],
              },
            } as ResultPutDto;
          });

          onSubmit({ id: form?.user_form.id as number, results });
        }}
      >
        <FormGroupList formGroups={form?.form_scheme.form_groups} />
        <nav
          style={{
            position: "fixed",
            zIndex: 2,
            bottom: 0,
            right: 0,
          }}
        >
          <Button
            style={{ backgroundColor: "purple", border: 0, boxShadow: "none" }}
            label="Editar"
            onClick={() => setIsFormEditable(false)}
          />
          <Button
            style={{ backgroundColor: "purple", border: 0, boxShadow: "none" }}
            label="Subir cambios"
            loading={isLoading}
            disabled={isLoading}
          />
          <Button
            style={{ backgroundColor: "purple", border: 0, boxShadow: "none" }}
            label="Aceptar formulario de ingreso"
            loading={isLoading}
            disabled={isLoading}
            onClick={acceptFormUser}
          />
          <Toast ref={toast} />
          <Button
            style={{ backgroundColor: "purple", border: 0 }}
            label="Ver PDF"
            onClick={handleClick}
          />
          <Button
            style={{ backgroundColor: "purple", border: 0, boxShadow: "none" }}
            label="Salir de modo edición"
            onClick={() => setIsFormEditable(true)}
          />
        </nav>
      </form>
    </ScrollPanel>
  );
};

export default PrintForm;
