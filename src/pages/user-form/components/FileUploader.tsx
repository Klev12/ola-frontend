import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { FileDocument } from "../../../models/file";
import { useMutation } from "react-query";
import GlobalFileService from "../../../services/global-file-service";

interface FileUploaderProps {
  maxFiles: number;
  showSpecificDelete?: boolean;
  showGeneralDelete?: boolean;
  onGlobalDelete?: (files: FileDocument[]) => void;
  onAfterUpload?: (files: FileDocument[]) => void;
  uploadUrl?: string;
  deleteUrl: string;
  name?: string;
  defaultFiles: FileDocument[];
}

const FileUploader = ({
  maxFiles,
  showGeneralDelete = true,
  showSpecificDelete = true,
  onGlobalDelete,
  uploadUrl,
  deleteUrl,
  name,
  defaultFiles,
  onAfterUpload,
}: FileUploaderProps) => {
  const toast = useRef<Toast>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<FileDocument[]>([]);

  const [allFilesUploaded, setAllFilesUploaded] = useState(false);

  const { mutate: uploadFiles } = useMutation(
    (files: File[]) =>
      new GlobalFileService({
        url: uploadUrl,
        name: name,
      }).upload(files),
    {
      onSuccess: () => {
        setFiles(files.map((file) => ({ ...file, status: "completado" })));
        if (onAfterUpload) onAfterUpload(files);
      },
    }
  );

  const { mutate: deleteFile, isLoading: isDeleting } = useMutation(
    (identifier: string) =>
      new GlobalFileService({
        deleteUrl,
      }).delete(identifier)
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
    if (files.length > 0 && files.every((file) => file.status === "completado"))
      setAllFilesUploaded(true);
  }, [files]);

  useEffect(() => {
    if (defaultFiles.length !== 0) setFiles(defaultFiles);
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
      />
      <Button
        label="Elegir archivos"
        onClick={() => {
          fileInputRef.current?.click();
        }}
        disabled={files.length === maxFiles}
      />
      <Button
        label="Subir archivos"
        disabled={files.length !== maxFiles || allFilesUploaded}
        onClick={() => {
          uploadFiles(files.map((file) => file.fileData as File));
        }}
      />
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
              setFiles([]);
              for (const file of files) {
                if (file.status === "completado") deleteFile(file.identifier);
              }
              if (onGlobalDelete) onGlobalDelete(files);
            }}
            style={{ justifySelf: "end" }}
            disabled={isDeleting}
            loading={isDeleting}
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
                <img src={file.url} alt="" width={40} />
                <Tag
                  severity={file.status === "pendiente" ? "warning" : "success"}
                  value={file.status}
                />
                {showSpecificDelete && (
                  <Button
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
