import { ENV } from "../../../../consts/const";
import { FormMetadata } from "../FormPdf";

interface FileImageListPdfProps {
  metadata?: FormMetadata;
}

const FileImageListPdf = ({ metadata }: FileImageListPdfProps) => {
  return (
    <div>
      {metadata?.files?.map((file) => {
        return <img src={`${ENV.BACKEND_ROUTE}/multimedia/${file.hash}`}></img>;
      })}
    </div>
  );
};

export default FileImageListPdf;
