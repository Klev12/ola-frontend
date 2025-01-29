import CanvasDraw from "react-canvas-draw";
import { Button } from "primereact/button";
import { useRef } from "react";
import { dataURLToBlob } from "../../services/document-service";

interface ExtendedCanvasDraw extends CanvasDraw {
  getDataURL: (type: string) => string;
}

interface CanvasDrawUploaderProps {
  onSubmit?: (file: File) => void;
  loading?: boolean;
  disabled?: boolean;
}

const CanvasDrawUploader = ({
  onSubmit,
  disabled,
  loading = false,
}: CanvasDrawUploaderProps) => {
  const canvas = useRef<ExtendedCanvasDraw>(null);

  const clean = () => {
    canvas.current?.clear();
  };

  const saveImage = () => {
    if (canvas.current) {
      const url = canvas.current.getDataURL("png");
      const blob = dataURLToBlob(url);
      const file = new File([blob], "signature.png", { type: "image/png" });

      if (onSubmit) onSubmit(file);
    }
  };

  return (
    <div>
      <CanvasDraw
        saveData=""
        ref={canvas}
        style={{
          maxWidth: "100",
          outline: "1px solid black",

          marginBottom: "10px",
        }}
        canvasWidth={320}
        canvasHeight={250}
        hideGrid
        brushColor="black"
        brushRadius={2}
        lazyRadius={0}
      />
      <div style={{ display: "flex", gap: "20px" }}>
        <Button
          type="button"
          outlined
          label="Limpiar"
          style={{ width: "100px" }}
          onClick={clean}
          disabled={loading || disabled}
          loading={loading}
        />
        <Button
          type="button"
          label="Subir"
          style={{ width: "100px" }}
          onClick={saveImage}
          disabled={loading || disabled}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default CanvasDrawUploader;
