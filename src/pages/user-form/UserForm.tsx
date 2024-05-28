import { useMutation, useQuery } from "react-query";
import { getUserForm } from "../../services/forms-service";
import FormGroupList from "./components/FormGroupList";
import { ResultPutDto } from "../../models/result";
import { submitForm } from "../../services/result-service";
import { ENV } from "../../consts/const";
import MyData from "./components/MyData";
import { ScrollPanel } from "primereact/scrollpanel";

const UserForm = () => {
  const { data: form } = useQuery({
    queryFn: () => getUserForm().then((res) => res.data),
  });

  const { mutate: submitFormMutate } = useMutation(submitForm, {
    onSuccess: (data) => {
      console.log(data.data);
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
              body: JSON.stringify({ id: 1 }),
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
        <MyData />
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
          <button>submit</button>
        </form>
      </ScrollPanel>
    </>
  );
};

export default UserForm;
