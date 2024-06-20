import CanvasDraw from "react-canvas-draw";
import { useNavigate } from "react-router";
import { useMutation } from "react-query";
import { useRef } from "react";
import { Button } from "primereact/button";
import { addUserSignature } from "../../../services/forms-service";

interface ClientSignatureProps {
  hash: string;
}

const ClientSignature = ({ hash }: ClientSignatureProps) => {
  const canvasRef = useRef<CanvasDraw>(null);

  const navigate = useNavigate();

  const { mutate: addUserSignatureMutate } = useMutation(addUserSignature, {
    onSuccess: () => {
      console.log("signature enviada!");
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
      }}
    >
      <div>
        Firma
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
