import { useMutation, useQuery } from "react-query";
import { getAllContracts } from "../../../services/contract-service";
import { Dropdown } from "primereact/dropdown";
import { useMemo, useState } from "react";
import { patchFormContract } from "../../../services/form-scheme";
import { Checkbox } from "primereact/checkbox";
import useToggle from "../../../hooks/useToggle";
import useGlobalState from "../../../store/store";
import { Card } from "primereact/card";

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

  const { value, toggle, setFalse } = useToggle();

  const userFormNames = useGlobalState((state) => state.userFormNames);
  const userFormLastNames = useGlobalState((state) => state.userFormLastNames);

  return (
    <div>
      <label htmlFor="">Elige el tipo de contrato:</label>

      <Card>
        <Card
          title={
            contractData?.contracts.find(
              (contract) => contract.id === selectedContract
            )?.title
          }
        >
          {selectedContract && (
            <Checkbox checked={value} onChange={() => toggle()} required />
          )}
          <div>
            Yo {userFormNames?.toUpperCase()} {userFormLastNames?.toUpperCase()}{" "}
            estoy de acuerdo con el siguiente contrato{" "}
          </div>
          <Dropdown
            required
            value={selectedContract}
            options={contractOptions}
            onChange={(e) => {
              setSelectedContract(e.value);
              patchFormContractMutate({ id: formId, contract_id: e.value });
              setFalse();
            }}
          />
          <p>
            {
              contractData?.contracts.find(
                (contract) => contract.id === selectedContract
              )?.description
            }
          </p>
        </Card>
      </Card>
    </div>
  );
};

export default SelectContractType;
