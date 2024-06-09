import { ScrollPanel } from "primereact/scrollpanel";
import { UserFormGetDto } from "../models/user-form";
import FormGroupList from "../pages/user-form/components/FormGroupList";
import { AllResultPutDto, ResultPutDto } from "../models/result";

interface PrintFormProps {
  form?: UserFormGetDto;
  onSubmit: (data: AllResultPutDto) => void;
}

const PrintForm = ({ form, onSubmit }: PrintFormProps) => {
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
      </form>
    </ScrollPanel>
  );
};

export default PrintForm;
