import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";

export function dataURLToBlob(dataURL: string): Blob {
  const byteString = atob(dataURL.split(",")[1]);
  const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

export function saveSignature(image: string) {
  const formData = new FormData();
  const blob = dataURLToBlob(image);
  formData.append("signature", blob, "signature.png");

  return axios.post(`${ENV.BACKEND_ROUTE}/multimedia/signature`, formData);
}
