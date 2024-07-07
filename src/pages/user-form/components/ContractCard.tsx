import { Card } from "primereact/card";
import { ContractGetDto } from "../../../models/contract";
import useGlobalState from "../../../store/store";
import { Checkbox } from "primereact/checkbox";
import useToggle from "../../../hooks/useToggle";

export interface ContractCardProps {
  contract?: ContractGetDto;
}

const ContractCard = ({ contract }: ContractCardProps) => {
  const userFormNames = useGlobalState((state) => state.userFormNames);
  const userFormLastNames = useGlobalState((state) => state.userFormLastNames);

  const { value, toggle } = useToggle();

  return (
    <Card title={contract?.title}>
      <Checkbox required checked={value} onChange={() => toggle()} />
      {`Yo ${userFormNames} ${userFormLastNames} estoy de acuerdo con el siguiente contrato `}
      {contract?.description}
    </Card>
  );
};

export default ContractCard;
