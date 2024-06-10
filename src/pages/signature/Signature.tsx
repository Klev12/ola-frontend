import { Button } from "primereact/button";
import React, { useRef, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import { useMutation } from "react-query";
import { saveSignature } from "../../services/document-service";
import { useNavigate } from "react-router";
import ROUTES from "../../consts/routes";

const SignatureDraw: React.FC = () => {
  const canvasRef = useRef<CanvasDraw>(null);

  const navigate = useNavigate();

  const { mutate: saveSignatureMutate } = useMutation(saveSignature, {
    onSuccess: () => {
      navigate(ROUTES.USER_FORM.VERIFICATION);
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

      saveSignatureMutate(url);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "80px",
        backgroundColor: "purple",
      }}
    >
      <div>
        Firma
        <p>Por favor realizar su firma en el cuadrado de color blanco.</p>
        <CanvasDraw
          ref={canvasRef}
          canvasWidth={700}
          canvasHeight={500}
          brushRadius={3}
          brushColor="purple"
          saveData="signature"
        />
        <Button label="limpiar" onClick={handleClearCanvas} />
        <Button label="guardar" onClick={saveImage} />
      </div>
    </div>
  );
};

export default SignatureDraw;
