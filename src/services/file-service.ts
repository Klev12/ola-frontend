import { ENV } from "../consts/const";
import { dataURLToBlob } from "./document-service";
import axios from "../interceptors/axios-interceptor";
import { FileType } from "../models/file";

export function saveFileImage({
  fileUrl,
  hash,
  type,
  hashMode = true,
  formId,
}: {
  fileUrl: string;
  hash: string;
  type: FileType;
  hashMode: boolean;
  formId?: string | number;
}) {
  const blob = dataURLToBlob(fileUrl);
  const formData = new FormData();
  formData.append("file", blob, "photo.png");
  formData.append("type", type);

  if (!hashMode) {
    formData.append("formId", formId as string);
  }

  return axios.post(
    `${ENV.BACKEND_ROUTE}/files/${hashMode ? hash : ""}`,
    formData
  );
}
