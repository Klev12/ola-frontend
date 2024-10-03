import { useMutation, useQuery } from "react-query";
import { getAllContracts } from "../../../services/contract-service";
import { Dropdown } from "primereact/dropdown";
import { useContext, useEffect, useMemo, useState } from "react";
import { patchFormContract } from "../../../services/form-scheme";
import { Checkbox } from "primereact/checkbox";
import useToggle from "../../../hooks/useToggle";
import { Card } from "primereact/card";
import { SalesFormContext } from "./WrapperSalesForm";
import { ContractGetDto, ContractType } from "../../../models/contract";
import { ScrollPanel } from "primereact/scrollpanel";

interface SelectContractTypeProps {
  formId: string | number;
}

const SelectContractType = ({ formId }: SelectContractTypeProps) => {
  const { formInfo, formDetails } = useContext(SalesFormContext);
  const { value, toggle, setFalse } = useToggle(!!formInfo?.contract);

  const [selectedContract, setSelectedContract] = useState<
    undefined | number
  >();

  useEffect(() => {
    if (formInfo?.contract?.id as number) {
      setSelectedContract(formInfo?.contract.id as number);
    }
  }, [formInfo]);

  const { data: contractData } = useQuery({
    queryFn: () =>
      getAllContracts({ type: ContractType.sales }).then((res) => res.data),
  });

  const contractOptions = useMemo(() => {
    if (!contractData) {
      return undefined;
    }

    return contractData?.contracts
      ?.filter((contract: ContractGetDto) => contract.id !== 1)
      ?.map((contract: ContractGetDto) => ({
        label: contract.title,
        value: contract.id,
      }));
  }, [contractData]);

  const { mutate: patchFormContractMutate } = useMutation(patchFormContract);

  return (
    <div>
      <Card>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Dropdown
            required
            value={selectedContract}
            options={contractOptions}
            onChange={(e) => {
              setSelectedContract(e.value);
              patchFormContractMutate({
                hash: formInfo?.hash as string,
                id: formId,
                contract_id: e.value,
              });
              setFalse();
            }}
            disabled
          />
        </div>
        <h2>
          {contractData?.contracts?.find(
            (contract) => contract.id === selectedContract
          )?.title || ""}
        </h2>
        <ScrollPanel style={{ height: "250px" }}>
          <div>
            {contractData?.contracts?.find(
              (contract) => contract.id === selectedContract
            )?.description || ""}
          </div>
        </ScrollPanel>

        <div style={{ marginTop: "20px" }}>
          <span>
            Yo {`${formDetails?.userNames} ${formDetails?.userLastNames} `}
            estoy de acuerdo.
          </span>
          {selectedContract && (
            <Checkbox checked={value} onChange={() => toggle()} required />
          )}
        </div>
      </Card>
    </div>
  );
};

export default SelectContractType;
