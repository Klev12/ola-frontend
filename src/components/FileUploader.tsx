import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { FileDocument } from "../models/file";
import { useMutation } from "react-query";
import GlobalFileService from "../services/global-file-service";
import CanvasDrawUploader from "./file-uploader/CanvasDrawUploader";
import { AxiosError } from "axios";
import CamaraUploader from "./file-uploader/CamaraUploader";

interface FileUploaderProps {
  maxFiles: number;
  showSpecificDelete?: boolean;
  showGeneralDelete?: boolean;
  onAfterGlobalDelete?: (files: FileDocument[]) => void;
  onAfterUpload?: (files: FileDocument[]) => void;
  uploadUrl?: string;
  deleteUrl: string;
  name?: string;
  defaultFiles: FileDocument[];
  accept?: string;
  type: "image" | "video" | "canvas-draw" | "camara";
  additionalPayload?: object;
  deletePayload?: object;
  inARow?: boolean;
  noIdentifier?: boolean;
  disabled?: boolean;
}

const FileUploader = ({
  maxFiles,
  disabled,
  showGeneralDelete = true,
  showSpecificDelete = true,
  noIdentifier = false,
  onAfterGlobalDelete,
  uploadUrl,
  deleteUrl,
  name,
  defaultFiles,
  onAfterUpload,
  accept,
  type = "image",
  additionalPayload,
  inARow = false,
  deletePayload,
}: FileUploaderProps) => {
  const toast = useRef<Toast>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<FileDocument[]>([]);

  const [allFilesUploaded, setAllFilesUploaded] = useState(false);

  const { mutate: uploadFiles, isLoading: isUploading } = useMutation(
    (files: File[]) =>
      new GlobalFileService({
        url: uploadUrl,
        name: name,
        payload: additionalPayload,
      }).upload(files),
    {
      onSuccess: () => {
        setFiles((files) =>
          files.map((file) => ({ ...file, status: "completado" }))
        );
        if (onAfterUpload) onAfterUpload(files);
        toast.current?.show({ severity: "success", summary: "Éxito" });
      },
      onError: (error: AxiosError<{ error?: { message?: string } }>) => {
        const message = error.response?.data.error?.message;

        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: message,
        });
      },
    }
  );

  const { mutate: deleteFile, isLoading: isDeleting } = useMutation(
    (identifier: string) =>
      new GlobalFileService({
        deleteUrl,
        payload: deletePayload,
      }).delete(identifier),
    {
      onSuccess: () => {
        setFiles([]);
        if (onAfterGlobalDelete) onAfterGlobalDelete(files);
      },
    }
  );

  const handleFileChange = () => {
    const currentFiles = fileInputRef.current?.files;

    if (currentFiles?.length == maxFiles) {
      setFiles(
        Array.from(currentFiles).map((currentFile, index) => ({
          id: index,
          url: URL.createObjectURL(currentFile),
          status: "pendiente",
          fileData: currentFile,
          identifier: String(index),
        }))
      );
    } else {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: `Deben ser ${maxFiles} archivos máximos`,
      });
    }
  };

  useEffect(() => {
    if (
      files.length > 0 &&
      files.every((file) => file.status === "completado")
    ) {
      setAllFilesUploaded(true);
    } else {
      setAllFilesUploaded(false);
    }
  }, [files]);

  useEffect(() => {
    setFiles(defaultFiles);
  }, [defaultFiles]);

  return (
    <div>
      <Toast ref={toast} />
      <input
        ref={fileInputRef}
        id="file"
        type="file"
        multiple
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept={accept}
      />
      {type !== "canvas-draw" && type !== "camara" && (
        <Button
          label="Elegir archivos"
          onClick={() => {
            fileInputRef.current?.click();
          }}
          disabled={files.length === maxFiles || disabled}
        />
      )}

      {type !== "canvas-draw" && type !== "camara" && (
        <Button
          label="Subir archivos"
          disabled={files.length !== maxFiles || allFilesUploaded || disabled}
          onClick={() => {
            if (inARow) {
              for (const file of files) {
                uploadFiles([file.fileData as File]);
              }
            } else {
              uploadFiles(files.map((file) => file.fileData as File));
            }
          }}
        />
      )}
      {type === "canvas-draw" && (
        <CanvasDrawUploader
          disabled={disabled}
          onSubmit={(file) => {
            uploadFiles([file]);

            setFiles([
              {
                id: 1,
                url: URL.createObjectURL(
                  new Blob([file], { type: "image/png" })
                ),
                identifier: "",
                status: "pendiente",
                fileData: file,
              },
            ]);
          }}
        />
      )}
      {type === "camara" && (
        <CamaraUploader
          disabled={disabled}
          onSubmit={(file) => {
            uploadFiles([file]);

            setFiles([
              {
                id: 1,
                url: URL.createObjectURL(new Blob([file])),
                identifier: "",
                status: "pendiente",
                fileData: file,
              },
            ]);
          }}
        />
      )}
      <div
        style={{
          display: "grid",
          outline: "1px solid purple",
          borderRadius: "5px",
          padding: "10px",
        }}
      >
        {files.length > 0 && showGeneralDelete && (
          <Button
            icon={PrimeIcons.TIMES}
            rounded
            onClick={() => {
              setFiles(files.filter((file) => file.status !== "pendiente"));
              for (const file of files) {
                if (file.status === "completado")
                  deleteFile(noIdentifier ? "" : file.identifier);
              }
            }}
            style={{ justifySelf: "end" }}
            disabled={isDeleting || isUploading || disabled}
            loading={isDeleting || isUploading}
          />
        )}

        <div>
          {files.map((file, index) => {
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                {type === "image" && <img src={file.url} alt="" width={40} />}
                {type === "video" && <video src={file.url} width={40} />}
                {type === "canvas-draw" && <img src={file.url} width={40} />}
                {type === "camara" && <img src={file.url} width={40} />}
                <Tag
                  severity={file.status === "pendiente" ? "warning" : "success"}
                  value={file.status}
                />
                {showSpecificDelete && (
                  <Button
                    disabled={disabled}
                    icon={PrimeIcons.TIMES}
                    rounded
                    onClick={() => {
                      setFiles(files.filter((f) => f.id !== file.id));
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
