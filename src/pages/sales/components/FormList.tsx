import { useMutation, useQuery } from "react-query";
import {
  generateLink,
  getAllForms,
  invalidateLink,
} from "../../../services/forms-service";
import { Fieldset } from "primereact/fieldset";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";

import { ScrollPanel } from "primereact/scrollpanel";
import useLoading from "../../../hooks/useLoading";

const FormList = () => {
  const { loading, setLoadingTrue, setLoadingFalse } = useLoading();
  const { data: formsData, refetch } = useQuery({
    queryFn: getAllForms,
  });
  const { mutate: generateLinkMutate } = useMutation(generateLink, {
    onSettled: () => {
      setLoadingFalse();
      refetch();
    },
  });
  const { mutate: invalidateLinkMutate } = useMutation(invalidateLink, {
    onSettled: () => {
      setLoadingFalse();
      refetch();
    },
  });

  return (
    <div>
      <ScrollPanel
        style={{ width: "80%", height: "600px", scrollbarColor: "blue" }}
        className="custombar2"
      >
        {formsData?.data.forms.map((form) => {
          return (
            <Fieldset legend={form.id} key={form.id}>
              {form.hash ? (
                <>
                  <h3>link: </h3>
                  <a href="">
                    http://localhost:8000/generate-forms/{form.hash}
                  </a>
                  <Button icon="pi pi-clipboard" />
                </>
              ) : (
                <Button
                  label="generar link"
                  loading={loading}
                  onClick={() => {
                    setLoadingTrue();
                    generateLinkMutate({ id: form.id });
                  }}
                />
              )}
              <Divider></Divider>
              {form.hash && (
                <Button
                  loading={loading}
                  label="invalidar link"
                  onClick={() => {
                    setLoadingTrue();
                    invalidateLinkMutate({ id: form.id });
                  }}
                />
              )}
            </Fieldset>
          );
        })}
      </ScrollPanel>
    </div>
  );
};

export default FormList;
