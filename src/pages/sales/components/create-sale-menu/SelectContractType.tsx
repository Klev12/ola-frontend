import { useContext, useMemo, useState } from "react";
import { SaleMenuContext } from "./CreateSaleMenu";
import { Button } from "primereact/button";
import { useQuery } from "react-query";
import { getAllContracts } from "../../../../services/contract-service";
import { ContractType } from "../../../../models/contract";
import { SelectButton } from "primereact/selectbutton";
import { ScrollPanel } from "primereact/scrollpanel";

const SelectContractType = () => {
  const { stepper, setSale, sale } = useContext(SaleMenuContext);

  const [selectedContractId, setSelectedContractId] = useState(0);

  const { data: contractsData } = useQuery({
    queryFn: () =>
      getAllContracts({ type: ContractType.sales }).then((res) => res.data),
    queryKey: ["contracts"],
  });

  const contract = useMemo(() => {
    return contractsData?.contracts.find(
      (contract) => contract.id === selectedContractId
    );
  }, [contractsData, selectedContractId]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SelectButton
        required
        value={selectedContractId}
        options={contractsData?.contracts.map((contract) => ({
          value: contract.id,
          label: contract.tag,
        }))}
        onChange={(e) => {
          setSelectedContractId(e.value);
        }}
      />
      <ScrollPanel style={{ height: "200px", width: "200px" }}>
        <small>{contract?.description}</small>
      </ScrollPanel>
      <Button
        disabled={!contract}
        label="Siguiente"
        onClick={() => {
          setSale({ ...sale, contract });
          stepper?.current?.nextCallback();
        }}
      />
    </div>
  );
};

export default SelectContractType;
