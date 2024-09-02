import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import useToggle from "../../../hooks/useToggle";
import { ReactNode, useState } from "react";
import { Dialog } from "primereact/dialog";

interface ListElementsProps<T extends object> {
  disabledButtons?: boolean;
  elements: T[];
  title: (element: T) => ReactNode;
  description: (element: T) => ReactNode;
  formTemplate: (selectedElement: T) => ReactNode;
  onSubmit?: (data: T, selectedItem: T) => void;
  closeMenu?: boolean;
  loading?: boolean;
  header?: (element: T) => ReactNode;
}
export default function ListElements<T extends object>({
  disabledButtons,
  elements,
  title,
  description,
  formTemplate,
  onSubmit,
  loading = false,
  header,
}: ListElementsProps<T>) {
  const showEditMenu = useToggle();
  const [selectedItem, setSelectedItem] = useState<T>();

  return (
    <div>
      <>{loading && <>Cargando...</>}</>
      {!loading && (
        <div style={{ display: "grid", gap: "10px" }}>
          {elements?.map((element, index) => {
            return (
              <Card
                key={index}
                header={
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "fit-content",
                    }}
                  >
                    <Button
                      style={{ margin: "10px" }}
                      outlined
                      icon={PrimeIcons.PENCIL}
                      onClick={() => {
                        showEditMenu.setTrue();
                        setSelectedItem(element);
                      }}
                    />
                    {header && header(element)}
                  </div>
                }
                title={title(element)}
              >
                {description(element)}
              </Card>
            );
          })}
          <Dialog
            visible={showEditMenu.value}
            draggable={false}
            onHide={() => showEditMenu.setFalse()}
            style={{
              width: "50vw",
              minWidth: "300px",
              maxWidth: "600px",
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

                if (onSubmit) onSubmit({ ...formData } as T, selectedItem as T);
                showEditMenu.setFalse();
              }}
            >
              {formTemplate(selectedItem as T)}
              <Button
                label="Subir cambios"
                disabled={disabledButtons}
                loading={disabledButtons}
              />
            </form>
          </Dialog>
        </div>
      )}
    </div>
  );
}
