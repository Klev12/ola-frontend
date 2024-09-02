import { useMutation, useQuery } from "react-query";
import regulationService from "../../../services/regulation-service";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { RegulationGetDto } from "../../../models/regulations";
import { PrimeIcons } from "primereact/api";
import useToggle from "../../../hooks/useToggle";
import ListElements from "./ListElements";
import { Editor } from "primereact/editor";

const GlobalRegulation = () => {
  const showMenu = useToggle();
  const showEditMenu = useToggle();
  const showDeleteMenu = useToggle();

  const [html, setHtml] = useState<string>();
  const [text, setText] = useState<string>();

  const { data: regulationData, refetch: refetchAllRegulations } = useQuery({
    queryFn: () => regulationService.findAll().then((res) => res.data),
    queryKey: ["all-regulations"],
  });

  const { mutate: createRegulation, isLoading: isCreatingRegulation } =
    useMutation(regulationService.create, {
      onSuccess: () => {
        refetchAllRegulations();
        showMenu.setFalse();
      },
    });

  const { mutate: patchRegulation, isLoading: isPatchingRegulation } =
    useMutation(regulationService.patch, {
      onSuccess: () => {
        refetchAllRegulations();
        showEditMenu.setFalse();
      },
    });

  const { mutate: deleteRegulationById, isLoading: isDeletingRegulation } =
    useMutation(regulationService.deleteById, {
      onSuccess: () => {
        refetchAllRegulations();
        showDeleteMenu.setFalse();
      },
    });

  const [selectedItem, setSelectedItem] = useState<RegulationGetDto>();

  return (
    <div>
      <ListElements
        header={(element) => (
          <div
            style={{
              display: "flex",
              justifyContent: "end",

              width: "100%",
            }}
          >
            <Button
              style={{ marginRight: "10px" }}
              rounded
              icon={PrimeIcons.TIMES}
              onClick={() => {
                setSelectedItem(element);
                showDeleteMenu.setTrue();
              }}
            />
          </div>
        )}
        elements={regulationData?.regulations || []}
        title={(regulation) => <>{regulation.title}</>}
        description={(regulation) => (
          <Editor
            value={regulation.html || regulation.description}
            readOnly
            showHeader={false}
            style={{
              height: "150px",
            }}
          />
        )}
        formTemplate={(regulation) => (
          <>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <label htmlFor="">Título</label>
              <InputText
                placeholder="Título"
                defaultValue={regulation?.title}
                name="title"
              />
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <label htmlFor="">Título</label>
              <Editor
                placeholder="Descripción"
                name="description"
                value={regulation?.description}
                onTextChange={(e) => {
                  setText(e.textValue);
                  setHtml(e.htmlValue || "");
                }}
                style={{ height: "300px" }}
              />
            </div>
          </>
        )}
        onSubmit={(data, selectedItem) => {
          patchRegulation({
            title: data.title,
            description: text as string,
            html,
            regulationId: selectedItem?.id as number,
          });
        }}
        disabledButtons={isPatchingRegulation}
      />
      <Button
        icon={PrimeIcons.PLUS}
        label="Crear nueva regla"
        onClick={() => showMenu.setTrue()}
      />
      <Dialog
        style={{ width: "50vw", maxWidth: "500px" }}
        visible={showMenu.value}
        onHide={() => {
          setHtml(undefined);
          setText(undefined);
          showMenu.setFalse();
        }}
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

            createRegulation({
              title: formData["title"].toString(),
              description: text as string,
              html: html || "",
            });
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <label htmlFor="">Título</label>
            <InputText required name="title" />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <label htmlFor="">Descripción</label>
            <Editor
              style={{ height: "300px" }}
              onTextChange={(e) => {
                setHtml(e.htmlValue || "");
                setText(e.textValue);
              }}
            />
          </div>
          <Button
            label="Crear reglamento"
            loading={isCreatingRegulation}
            disabled={isCreatingRegulation}
          />
        </form>
      </Dialog>
      <Dialog
        visible={showDeleteMenu.value}
        onHide={() => showDeleteMenu.setFalse()}
      >
        <p>¿Deseas eliminar el reglamento?</p>
        <Button
          severity="danger"
          label="Aceptar"
          disabled={isDeletingRegulation}
          loading={isDeletingRegulation}
          onClick={() => deleteRegulationById(selectedItem?.id as number)}
        />
        <Button
          label="Cancelar"
          loading={isDeletingRegulation}
          disabled={isDeletingRegulation}
        />
      </Dialog>
    </div>
  );
};

export default GlobalRegulation;
