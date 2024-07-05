import { useMutation, useQuery } from "react-query";
import { getAllContracts } from "../../../services/contract-service";
import { Dropdown } from "primereact/dropdown";
import { useMemo, useState } from "react";
import { patchFormContract } from "../../../services/form-scheme";

interface SelectContractTypeProps {
  formId: string | number;
}

const SelectContractType = ({ formId }: SelectContractTypeProps) => {
  const [selectedContract, setSelectedContract] = useState<undefined | number>(
    undefined
  );

  const { data: contractData } = useQuery({
    queryFn: () => getAllContracts().then((res) => res.data),
  });

  const contractOptions = useMemo(() => {
    return contractData?.contracts
      .filter((contract) => contract.id !== 1)
      .map((contract) => ({
        label: contract.title,
        value: contract.id,
      }));
  }, [contractData]);

  const { mutate: patchFormContractMutate } = useMutation(patchFormContract);

  return (
    <div>
      <Dropdown
        value={selectedContract}
        options={contractOptions}
        onChange={(e) => {
          setSelectedContract(e.value);
          patchFormContractMutate({ id: formId, contract_id: e.value });
        }}
        name="contract-type"
      />
    </div>
  );
};

export default SelectContractType;
