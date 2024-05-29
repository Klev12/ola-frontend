import { useMutation, useQuery } from "react-query";
import { getUserForm } from "../../services/forms-service";
import FormGroupList from "./components/FormGroupList";
import { ResultPutDto } from "../../models/result";
import { submitForm } from "../../services/result-service";
import { ENV } from "../../consts/const";
import { ScrollPanel } from "primereact/scrollpanel";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../consts/routes";

const UserForm = () => {
  const navigate = useNavigate();
  const { data: form } = useQuery({
    queryFn: () => getUserForm().then((res) => res.data),
  });

  const { mutate: submitFormMutate } = useMutation(submitForm, {
    onSuccess: (data) => {
      console.log(data.data);
      navigate(ROUTES.USER_FORM.TERMS_AND_CONDITIONS);
    },
  });

  return (
    <>
      <ScrollPanel>
        <button
          onClick={() => {
            fetch(`${ENV.BACKEND_ROUTE}/forms/verify-form`, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id: form?.user_form.id }),
            })
              .then((res) => res.json())
              .then((res) => {
                console.log(res);
              });
          }}
        >
          verify form
        </button>
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

            submitFormMutate({
              id: form?.user_form.id as number,
              results,
            });
          }}
        >
          <FormGroupList formGroups={form?.form_scheme.form_groups} />
          <Button
            label="Siguiente"
            type="submit"
            style={{ backgroundColor: "purple" }}
          />
        </form>
      </ScrollPanel>
    </>
  );
};

export default UserForm;
