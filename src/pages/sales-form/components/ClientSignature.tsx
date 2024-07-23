import CanvasDraw from "react-canvas-draw";
import { useMutation } from "react-query";
import { useContext, useRef, useState } from "react";
import { Button } from "primereact/button";
import { addUserSignature } from "../../../services/forms-service";
import { SalesFormContext } from "./WrapperSalesForm";

interface ExtendedCanvasDraw extends CanvasDraw {
  getDataURL: (type: string) => string;
}

interface ClientSignatureProps {
  hash: string;
  beforeOnSuccess?: () => void;
}

const ClientSignature = ({ hash, beforeOnSuccess }: ClientSignatureProps) => {
  const { hashMode, form } = useContext(SalesFormContext);

  const canvasRef = useRef<ExtendedCanvasDraw>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const { mutate: addUserSignatureMutate } = useMutation(addUserSignature, {
    onSuccess: () => {
      console.log("Signature sent!");
      beforeOnSuccess && beforeOnSuccess();
    },
    onError: () => {
      setErrorMessage("Error uploading signature");
    },
  });

  const handleClearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
    }
  };

  const saveImage = () => {
    if (canvasRef.current) {
      const url = canvasRef.current.getDataURL("png");
      if (hashMode) {
        addUserSignatureMutate({ image: url, hash, hashMode: true });
        return;
      }
      addUserSignatureMutate({
        image: url,
        hashMode: false,
        hash,
        formId: form?.form?.id,
      });
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
        <div>Firma</div>
        <small style={{ display: "flex" }}>
          {errorMessage && errorMessage}
        </small>
        <p>Por favor, realice su firma en el cuadrado de color blanco.</p>
        <CanvasDraw
          ref={canvasRef}
          canvasWidth={500}
          canvasHeight={300}
          brushRadius={3}
          brushColor="black"
          saveData="signature"
        />
        <Button label="Limpiar" onClick={handleClearCanvas} />
        <Button label="Guardar" onClick={saveImage} />
      </div>
    </div>
  );
};

export default ClientSignature;
