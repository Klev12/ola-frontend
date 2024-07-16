import { useRef, useState } from "react";

import "primeicons/primeicons.css";
import { Button } from "primereact/button";
import { useMutation } from "react-query";
import { saveFileImage } from "../../../services/file-service";
import { useParams } from "react-router";
import { FileType } from "../../../models/file";

export const Camera = () => {
  const { hash } = useParams();
  const { mutate: saveFileImageMutate } = useMutation(saveFileImage);

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
      photoRef.current.width = width;
      photoRef.current.height = height;

      const context = photoRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, width, height);

        const imageUrl = photoRef.current.toDataURL("image/png");
        setPhoto(imageUrl);
        saveFileImageMutate({
          fileUrl: imageUrl,
          hash: hash as string,
          type: FileType.photo,
        });
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
        <Button type="button" label="Camara" onClick={StartCamera} />
        <Button
          type="button"
          label="Tomar foto"
          onClick={takePhoto}
          disabled={!isCameraOn}
          icon="pi pi-camera"
        />
      </div>
      <canvas ref={photoRef} style={{ display: "none" }}></canvas>
      {photo && <img src={photo} alt="Captured" />}
    </div>
  );
};
