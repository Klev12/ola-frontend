import { Button } from "primereact/button";
import { useEffect, useRef, useState } from "react";
import { dataURLToBlob } from "../../services/document-service";

interface CamaraUploaderProps {
  onSubmit?: (file: File) => void;
  loading?: boolean;
  disabled?: boolean;
}

const CamaraUploader = ({
  onSubmit,
  loading,
  disabled,
}: CamaraUploaderProps) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [file, setFile] = useState<File>();

  const StartCamera = async () => {
    const newStream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    if (videoRef.current) {
      videoRef.current.srcObject = newStream;
      videoRef.current.play();
      setIsCameraOn(true);
      setStream(newStream);
    }
  };

  const takePhoto = () => {
    if (videoRef.current && photoRef.current) {
      const width = videoRef.current.videoWidth;
      const height = videoRef.current.videoHeight;
      photoRef.current.width = width;
      photoRef.current.height = height;

      const context = photoRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, width, height);

        const imageUrl = photoRef.current.toDataURL("image/png");
        const blob = dataURLToBlob(imageUrl);
        const file = new File([blob], "photo.png", { type: "image/png" });
        setFile(file);
        setPhoto(imageUrl);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return (
    <div>
      <div style={{ display: "flex", gap: "10px" }}>
        <Button
          type="button"
          label="Encender cámara"
          onClick={StartCamera}
          disabled={disabled}
        />
        {isCameraOn && (
          <Button
            type="button"
            label="Tomar foto"
            onClick={takePhoto}
            disabled={!isCameraOn || disabled}
            icon="pi pi-camera"
          />
        )}
        {isCameraOn && photo && (
          <Button
            type="button"
            label="Subir foto"
            disabled={!isCameraOn || loading || disabled}
            loading={loading}
            onClick={() => {
              if (onSubmit) onSubmit(file as File);
            }}
          />
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <video
          ref={videoRef}
          style={{ display: isCameraOn ? "block" : "none", width: "300px" }}
        ></video>
        <canvas
          ref={photoRef}
          style={{ display: "none", width: "100vw" }}
        ></canvas>
        <div>
          {photo && (
            <img src={photo} alt="Captured" style={{ width: "300px" }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CamaraUploader;
