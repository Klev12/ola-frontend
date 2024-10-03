import { useQuery } from "react-query";
import proofService from "../../../services/proof-service";
import { useState } from "react";
import PaginatorPage from "../../../components/PaginatorPage";
import { ENV } from "../../../consts/const";

interface ProofListProps {
  formId?: number;
}

const ProofList = ({ formId }: ProofListProps) => {
  const [page, setPage] = useState(1);

  const { data: proofsData } = useQuery({
    queryFn: () =>
      proofService.findAll({ formId, page }).then((res) => res.data),
    queryKey: ["proofs", formId, page],
  });

  return (
    <div>
      {proofsData?.proofs.map((proof) => {
        return (
          <img
            src={`${ENV.BACKEND_ROUTE}/multimedia/proofs/${proof.hash}`}
            style={{ width: "300px" }}
          ></img>
        );
      })}
      <PaginatorPage
        limit={10}
        total={proofsData?.count}
        onPage={(page) => setPage(page)}
      />
    </div>
  );
};

export default ProofList;
