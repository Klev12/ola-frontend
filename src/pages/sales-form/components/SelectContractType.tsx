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
import SalesFormContractStatic from "../../../components/term-and-conditions/SalesFormContractStatic";

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
      <label htmlFor="">Elige el tipo de contrato:</label>

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
          />
        </div>
        <h2>
          {contractData?.contracts?.find(
            (contract) => contract.id === selectedContract
          )?.title || ""}
        </h2>
        <ScrollPanel style={{ height: "250px" }}>
          <SalesFormContractStatic formDetails={formDetails}>
            <div>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    contractData?.contracts?.find(
                      (contract) => contract.id === selectedContract
                    )?.html || "",
                }}
              ></div>
            </div>
          </SalesFormContractStatic>
        </ScrollPanel>

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
