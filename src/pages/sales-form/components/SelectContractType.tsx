import { useMutation, useQuery } from "react-query";
import { getAllContracts } from "../../../services/contract-service";
import { Dropdown } from "primereact/dropdown";
import { useContext, useMemo, useState } from "react";
import { patchFormContract } from "../../../services/form-scheme";
import { Checkbox } from "primereact/checkbox";
import useToggle from "../../../hooks/useToggle";
import useGlobalState from "../../../store/store";
import { Card } from "primereact/card";
import { SalesFormContext } from "./WrapperSalesForm";
import { ContractGetDto } from "../../../models/contract";

interface SelectContractTypeProps {
  formId: string | number;
}

const SelectContractType = ({ formId }: SelectContractTypeProps) => {
  const { form } = useContext(SalesFormContext);
  const { value, toggle, setFalse, setTrue } = useToggle();

  const [selectedContract, setSelectedContract] = useState<undefined | number>(
    () => {
      if (form?.form?.contract?.id as number) {
        setTrue();
        return form?.form?.contract.id as number;
      }
    }
  );

  const { data: contractData } = useQuery({
    queryFn: () => getAllContracts().then((res) => res.data),
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

  const userFormNames = useGlobalState((state) => state.userFormNames);
  const userFormLastNames = useGlobalState((state) => state.userFormLastNames);

  return (
    <div>
      <label htmlFor="">Elige el tipo de contrato:</label>

      <Card>
        <Card
          title={
            contractData?.contracts?.find(
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
              patchFormContractMutate({
                hash: form?.form?.hash as string,
                id: formId,
                contract_id: e.value,
              });
              setFalse();
            }}
          />
          <p>
            {
              contractData?.contracts?.find(
                (contract) => contract.id === selectedContract
              )?.description
            }
          </p>
          {selectedContract && (
            <Card>
              <h3>
                Proyecto{" "}
                {
                  contractData?.contracts?.find(
                    (contract) => contract.id === selectedContract
                  )?.project
                }{" "}
                + IVA
              </h3>
              <h3>
                Mensualidades 9, de{" "}
                {
                  contractData?.contracts?.find(
                    (contract) => contract.id === selectedContract
                  )?.monthly_payment
                }
              </h3>
              <h3>
                Subscripción{" "}
                {
                  contractData?.contracts?.find(
                    (contract) => contract.id === selectedContract
                  )?.suscription
                }
              </h3>
            </Card>
          )}
        </Card>
      </Card>
    </div>
  );
};

export default SelectContractType;
