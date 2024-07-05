import { useRef, useState } from "react";

import "primeicons/primeicons.css";
import { Button } from "primereact/button";

export const Camera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  const StartCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setIsCameraOn(true);
    }
  };

  const takePhoto = () => {
    if (videoRef.current && photoRef.current) {
      const width = videoRef.current.videoWidth;
      const height = videoRef.current.videoHeight;

      const context = photoRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, width, height);

        const imageUrl = photoRef.current.toDataURL("image/png");
        setPhoto(imageUrl);
      }
    }
  };
  return (
    <div>
      <div>
        <video
          ref={videoRef}
          style={{ display: isCameraOn ? "block" : "none" }}
        ></video>
        <Button label="Camara" onClick={StartCamera} />
        <Button
          label="Tomar foto"
          onClick={takePhoto}
          disabled={!isCameraOn}
          icon="pi pi-camera"
        />
      </div>
      <canvas ref={photoRef} style={{ display: "none" }}></canvas>{" "}
      {photo && <img src={photo} alt="Captured" />}{" "}
    </div>
  );
};
