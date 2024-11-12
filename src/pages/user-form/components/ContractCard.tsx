import { Card } from "primereact/card";
import { ContractGetDto } from "../../../models/contract";
import { Checkbox } from "primereact/checkbox";
import useToggle from "../../../hooks/useToggle";
import { ScrollPanel } from "primereact/scrollpanel";

export interface ContractCardProps {
  contract?: ContractGetDto;
}

const ContractCard = ({ contract }: ContractCardProps) => {
  const { value, toggle } = useToggle();

  return (
    <Card title={contract?.title}>
      <ScrollPanel style={{ height: "300px" }}>
        <div dangerouslySetInnerHTML={{ __html: contract?.html || "" }}></div>
      </ScrollPanel>
      <div className="checkbox-container" style={{ marginTop: "20px" }}>
        <Checkbox required checked={value} onChange={() => toggle()} />
        <span>Acepto el contrato que acabo de leer</span>
      </div>
    </Card>
  );
};

export default ContractCard;
