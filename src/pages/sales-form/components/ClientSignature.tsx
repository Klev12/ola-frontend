import CanvasDraw from "react-canvas-draw";
import { useMutation } from "react-query";
import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { addUserSignature } from "../../../services/forms-service";

interface ClientSignatureProps {
  hash: string;
  beforeOnSuccess?: () => void;
}

const ClientSignature = ({ hash, beforeOnSuccess }: ClientSignatureProps) => {
  const canvasRef = useRef<CanvasDraw>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const { mutate: addUserSignatureMutate } = useMutation(addUserSignature, {
    onSuccess: () => {
      console.log("signature enviada!");
      beforeOnSuccess && beforeOnSuccess();
    },
    onError: () => {
      setErrorMessage("Error al subir la firma");
    },
  });

  const handleClearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
    }
  };

  const saveImage = () => {
    if (canvasRef.current) {
      const url = (canvasRef.current as any).getDataURL("png");

      addUserSignatureMutate({ image: url, hash });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
        backgroundColor: "purple",
        paddingBottom: 100,
      }}
    >
      <div>
        Firma
        <small style={{ display: "flex" }}>
          {errorMessage && errorMessage}
        </small>
        <p>Por favor realizar su firma en el cuadrado de color blanco.</p>
        <CanvasDraw
          ref={canvasRef}
          canvasWidth={500}
          canvasHeight={300}
          brushRadius={3}
          brushColor="black"
          saveData="signature"
        />
        <Button label="limpiar" onClick={handleClearCanvas} />
        <Button label="guardar" onClick={saveImage} />
      </div>
    </div>
  );
};

export default ClientSignature;
