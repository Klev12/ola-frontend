import { Button } from "primereact/button";
import React, { useRef, useState } from "react";
import CanvasDraw from "react-canvas-draw";

const SignatureDraw: React.FC = () => {
  const canvasRef = useRef<CanvasDraw>(null);
  const [drawing, setDrawing] = useState<string | null>(null);

  const handleClearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
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
        />
        <Button label="limpiar" onClick={handleClearCanvas} />
        <Button label="guardar" />
      </div>
    </div>
  );
};

export default SignatureDraw;
