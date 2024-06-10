import { ScrollPanel } from "primereact/scrollpanel";
import { UserFormGetDto } from "../models/user-form";
import FormGroupList from "../pages/user-form/components/FormGroupList";
import { AllResultPutDto, ResultPutDto } from "../models/result";
import { Button } from "primereact/button";
import { MouseEventHandler } from "react";
import { useMutation } from "react-query";
import { verifyUserForm } from "../services/user-service";
import { useNavigate } from "react-router-dom";

interface PrintFormProps {
  form?: UserFormGetDto;
  onSubmit: (data: AllResultPutDto) => void;
  isLoading?: boolean;
}

const PrintForm = ({ form, onSubmit, isLoading }: PrintFormProps) => {
  const { mutate: verifyUserFormMutate } = useMutation(verifyUserForm);
  const navigate = useNavigate();

  const acceptFormUser: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    verifyUserFormMutate(form?.user_form.user_id as number);
  };

  const handleClick = () => {
    navigate("/user-form/form-pdf");
  };

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
        <nav style={{ position: "fixed", zIndex: 2, bottom: 0, right: 0 }}>
          <Button
            label="Subir cambios"
            loading={isLoading}
            disabled={isLoading}
          />
          <Button
            label="Aceptar formulario de ingreso"
            loading={isLoading}
            disabled={isLoading}
            onClick={acceptFormUser}
          />
          <Button label="Ver PDF" onClick={handleClick} />
        </nav>
      </form>
    </ScrollPanel>
  );
};

export default PrintForm;
