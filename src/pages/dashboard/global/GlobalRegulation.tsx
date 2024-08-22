import { useMutation, useQuery } from "react-query";
import regulationService from "../../../services/regulation-service";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";
import { RegulationGetDto } from "../../../models/regulations";
import { PrimeIcons } from "primereact/api";
import useToggle from "../../../hooks/useToggle";

const GlobalRegulation = () => {
  const showMenu = useToggle();
  const showEditMenu = useToggle();
  const showDeleteMenu = useToggle();

  const { data: regulationData, refetch: refetchAllRegulations } = useQuery({
    queryFn: () => regulationService.findAll().then((res) => res.data),
    queryKey: ["regulations-data"],
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
      <div style={{ display: "grid", gap: "20px" }}>
        {regulationData?.regulations?.map((regulation) => {
          return (
            <Card
              header={
                <>
                  <Button
                    icon={PrimeIcons.PENCIL}
                    onClick={() => {
                      showEditMenu.setTrue();
                      setSelectedItem(regulation);
                    }}
                  />
                </>
              }
              footer={
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <Button
                    rounded
                    icon={PrimeIcons.TIMES}
                    onClick={() => {
                      setSelectedItem(regulation);
                      showDeleteMenu.setTrue();
                    }}
                  />
                </div>
              }
              title={regulation.title}
            >
              {regulation.description}
            </Card>
          );
        })}
      </div>

      <Button
        icon={PrimeIcons.PLUS}
        label="Crear nueva regla"
        onClick={() => showMenu.setTrue()}
      />
      <Dialog visible={showMenu.value} onHide={() => showMenu.setFalse()}>
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
              description: formData["description"].toString(),
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
            <InputTextarea
              required
              name="description"
              style={{ height: "150px" }}
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

      <Dialog
        visible={showEditMenu.value}
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

            patchRegulation({
              title: formData["title"].toString(),
              description: formData["description"].toString(),
              regulationId: selectedItem?.id as number,
            });
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <label htmlFor="">Título</label>
            <InputText
              required
              name="title"
              defaultValue={selectedItem?.title}
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
            disabled={isPatchingRegulation}
            loading={isPatchingRegulation}
          />
        </form>
      </Dialog>
    </div>
  );
};

export default GlobalRegulation;
