import { useMutation, useQuery } from "react-query";
import termAndConditionsService from "../../../services/term-and-conditions-service";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";
import { Dialog } from "primereact/dialog";
import useToggle from "../../../hooks/useToggle";
import { useState } from "react";
import { TermAndConditionsGetDto } from "../../../models/term-and-conditions";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

const GlobalTermsAndConditions = () => {
  const showEditMenu = useToggle();

  const [selectedItem, setSelectedItem] = useState<TermAndConditionsGetDto>();

  const { data: termAndConditionsData, refetch: refetchAllTermAndConditions } =
    useQuery({
      queryFn: () => termAndConditionsService.findAll().then((res) => res.data),
    });

  const {
    mutate: patchTermAndConditions,
    isLoading: patchingTermAndConditions,
  } = useMutation(termAndConditionsService.patch, {
    onSuccess: () => {
      showEditMenu.setFalse();
      refetchAllTermAndConditions();
    },
  });

  return (
    <div>
      {termAndConditionsData?.termAndConditions?.map((termAndCondition) => {
        return (
          <Card
            header={
              <>
                <Button
                  style={{ margin: "10px" }}
                  outlined
                  icon={PrimeIcons.PENCIL}
                  onClick={() => {
                    showEditMenu.setTrue();
                    setSelectedItem(termAndCondition);
                  }}
                />
              </>
            }
            title={termAndCondition.title}
          >
            {termAndCondition.description}
          </Card>
        );
      })}
      <Dialog
        visible={showEditMenu.value}
        draggable={false}
        onHide={() => showEditMenu.setFalse()}
      >
        <form
          action=""
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "100%",
            minWidth: "100px",
            margin: "0 auto",
          }}
          onSubmit={(e) => {
            e.preventDefault();

            const formData = Object.fromEntries(
              new FormData(e.target as HTMLFormElement)
            );

            patchTermAndConditions({
              description: formData["description"].toString(),
              title: formData["title"].toString(),
              termAndConditionsId: selectedItem?.id as number,
            });
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <label htmlFor="">Título</label>
            <InputText
              required
              defaultValue={selectedItem?.title}
              name="title"
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <label htmlFor="">Descripción</label>
            <InputTextarea
              required
              defaultValue={selectedItem?.description}
              name="description"
              style={{ height: "150px" }}
            />
          </div>
          <Button
            label="Subir cambios"
            disabled={patchingTermAndConditions}
            loading={patchingTermAndConditions}
          />
        </form>
      </Dialog>
    </div>
  );
};

export default GlobalTermsAndConditions;
