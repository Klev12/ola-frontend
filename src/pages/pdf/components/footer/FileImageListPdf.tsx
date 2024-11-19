import { ENV } from "../../../../consts/const";
import { FormMetadata } from "../FormPdf";

interface FileImageListPdfProps {
  metadata?: FormMetadata;
}

const FileImageListPdf = ({ metadata }: FileImageListPdfProps) => {
  return (
    <div style={{ pageBreakBefore: "always" }}>
      <h2 style={{ textAlign: "center" }}>Documentos</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          gap: "20px",
        }}
      >
        {metadata?.files?.map((file) => {
          return (
            <img
              key={file.hash}
              style={{ width: "200px" }}
              src={`${ENV.BACKEND_ROUTE}/multimedia/${file.hash}`}
            ></img>
          );
        })}
      </div>
    </div>
  );
};

export default FileImageListPdf;
