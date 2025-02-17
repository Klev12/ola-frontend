import { FormMetadata } from "../FormPdf";
import { FileType } from "../../../../models/file";
import { ENV } from "../../../../consts/const";

interface FilesPageProps {
  metadata?: FormMetadata;
}

const FilesPage = ({ metadata }: FilesPageProps) => {
  const cardIdImages = metadata?.files?.filter(
    (file) => file.type === FileType.cardId
  );

  const photo = metadata?.files?.find((file) => file.type === FileType.photo);

  return (
    <div style={{ pageBreakBefore: "always" }}>
      {cardIdImages?.length !== 0 && (
        <div>
          <h2>Cédula</h2>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {cardIdImages?.map((card) => {
              return (
                <div>
                  <img
                    src={`${ENV.BACKEND_ROUTE}/multimedia/${card.hash}`}
                    alt={card.type}
                    height={200}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
      {photo && (
        <div>
          <h2>Foto</h2>
          <img
            src={`${ENV.BACKEND_ROUTE}/multimedia/${photo?.hash}`}
            alt={photo?.type}
            height={130}
          />
        </div>
      )}
    </div>
  );
};

export default FilesPage;
