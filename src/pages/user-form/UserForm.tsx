import { useMutation, useQuery } from "react-query";
import { getUserForm } from "../../services/forms-service";
import FormGroupList from "./components/FormGroupList";
import { ResultPutDto } from "../../models/result";
import { submitForm } from "../../services/result-service";
import { ScrollPanel } from "primereact/scrollpanel";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../consts/routes";
import useGlobalState from "../../store/store";

const UserForm = () => {
  const setUserFormNames = useGlobalState((state) => state.setUserFormNames);
  const setUserFormLastNames = useGlobalState(
    (state) => state.setUserFormLastNames
  );

  const setUserFormId = useGlobalState((state) => state.setUserFormId);

  const setUserIdCard = useGlobalState((state) => state.setUserIdCard);

  const navigate = useNavigate();
  const { data: form } = useQuery({
    queryFn: () => getUserForm().then((res) => res.data),
    onSuccess: () => {
      if (form?.user_form.done) {
        navigate(ROUTES.USER_FORM.TERMS_AND_CONDITIONS);
      }
    },
    queryKey: ["user-form-data"],
  });

  const { mutate: submitFormMutate } = useMutation(submitForm, {
    onSuccess: (data) => {
      console.log(data.data);
      setUserFormId(form?.user_form.id as number);
      navigate(ROUTES.USER_FORM.TERMS_AND_CONDITIONS);
    },
  });

  return (
    <>
      <ScrollPanel>
        <h2>{form?.form_scheme?.label} </h2>

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

            setUserFormNames(results[0].response.value);
            setUserFormLastNames(results[1].response.value);
            setUserIdCard(results[2].response.value);

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
            style={{
              backgroundColor: "purple",
              border: "0",
              margin: "10px",
            }}
          />
        </form>
      </ScrollPanel>
    </>
  );
};

export default UserForm;
