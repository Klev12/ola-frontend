import { useQuery } from "react-query";
import regulationService from "../../services/regulation-service";
import ButtonInfo from "./components/ButtonInfo";

const Regulation = () => {
  const { data: regulationData, refetch: refetchAllRegulations } = useQuery({
    queryFn: () => regulationService.findAll().then((res) => res.data),
    queryKey: ["regulation-data-user"],
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        padding: "10px",
      }}
    >
      <h2>Reglamentos</h2>
      <div style={{ display: "grid", gap: "20px" }}>
        {regulationData?.regulations?.map((regulation) => {
          return (
            <ButtonInfo
              key={regulation.id}
              label="Leer reglamento"
              title={regulation.title}
              description={regulation.description}
              checked={!!regulation.seen}
              regulationId={regulation.id}
              onSuccess={() => {
                refetchAllRegulations();
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Regulation;
