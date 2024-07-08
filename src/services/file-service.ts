import { ENV } from "../consts/const";
import { dataURLToBlob } from "./document-service";
import axios from "../interceptors/axios-interceptor";
import { FileType } from "../models/file";

export function saveFileImage({
  fileUrl,
  hash,
  type,
}: {
  fileUrl: string;
  hash: string;
  type: FileType;
}) {
  const blob = dataURLToBlob(fileUrl);
  const formData = new FormData();
  formData.append("file", blob, "photo.png");
  formData.append("type", type);

  return axios.post(`${ENV.BACKEND_ROUTE}/files/${hash}`, formData);
}
