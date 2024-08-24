import { Card } from "primereact/card";
import { ContractGetDto } from "../../../models/contract";
import { Checkbox } from "primereact/checkbox";
import useToggle from "../../../hooks/useToggle";
import ContractHeader from "../../../components/ContractHeader";
import { ScrollPanel } from "primereact/scrollpanel";

export interface ContractCardProps {
  contract?: ContractGetDto;
}

const ContractCard = ({ contract }: ContractCardProps) => {
  const { value, toggle } = useToggle();

  return (
    <Card title={contract?.title}>
      <Checkbox required checked={value} onChange={() => toggle()} />
      <ContractHeader />
      <ScrollPanel style={{ height: "300px" }}>
        {contract?.description}
      </ScrollPanel>
    </Card>
  );
};

export default ContractCard;
