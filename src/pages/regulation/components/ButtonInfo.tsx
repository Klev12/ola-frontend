import { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Checkbox } from "primereact/checkbox";
import useToggle from "../../../hooks/useToggle";
import { useMutation } from "react-query";
import regulationService from "../../../services/regulation-service";
import { Editor } from "primereact/editor";

interface ButtonInfo {
  regulationId?: number;
  label?: string;
  title?: string;
  description?: string;
  html?: string;
  checked?: boolean;
  onSuccess?: () => void;
}

export default function ButtonInfo({
  title,
  label,
  description,
  checked,
  onSuccess,
  regulationId,
  html,
}: ButtonInfo) {
  const [visible, setVisible] = useState<boolean>(false);
  const isCheckBox = useToggle();

  const { mutate: markRegulationAsSeen, isLoading: isMarkingAsSeen } =
    useMutation(regulationService.markAsSeen, {
      onSuccess: () => {
        if (onSuccess) onSuccess();
        setVisible(false);
      },
    });

  return (
    <div className="card flex justify-content-center">
      <Button
        label={label}
        icon="pi pi-external-link"
        onClick={() => setVisible(true)}
        severity={checked ? "success" : "danger"}
        style={{
          display: "flex",
          flexDirection: "column",
          border: "0",
          boxShadow: "none",
        }}
      />
      <Dialog
        draggable={false}
        header={title}
        visible={visible}
        maximizable
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
          isCheckBox.setFalse();
        }}
      >
        <Editor
          value={html || description}
          showHeader={false}
          style={{ height: "350px" }}
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(regulationId);
            markRegulationAsSeen({ regulationId: regulationId as number });
          }}
        >
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <p>Estoy de acuerdo</p>
            <Checkbox
              value={isCheckBox.value}
              required
              onChange={() => {
                isCheckBox.toggle();
              }}
              checked={!!checked || isCheckBox.value}
            />
          </div>
          <Button
            label="Aceptar"
            disabled={isMarkingAsSeen}
            loading={isMarkingAsSeen}
          />
        </form>
      </Dialog>
    </div>
  );
}
