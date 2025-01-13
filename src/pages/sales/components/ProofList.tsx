import { useQuery } from "react-query";
import proofService from "../../../services/proof-service";
import { useState } from "react";
import PaginatorPage from "../../../components/PaginatorPage";

import ProofElementMenu from "../../../core/components/ProofElementMenu";

interface ProofListProps {
  formId?: number;
}

const ProofList = ({ formId }: ProofListProps) => {
  const [page, setPage] = useState(1);

  const { data: proofsData, refetch: refetchProofList } = useQuery({
    queryFn: () =>
      proofService.findAll({ formId, page }).then((res) => res.data),
    queryKey: ["proofs", formId, page],
  });

  return (
    <div style={{ width: "300px" }}>
      {proofsData?.proofs.map((proof) => {
        return (
          <ProofElementMenu
            key={proof.id}
            proof={proof}
            onSuccessUpload={() => {
              refetchProofList();
            }}
          />
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
