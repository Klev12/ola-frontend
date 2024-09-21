import { Card } from "primereact/card";
import { ContractGetDto } from "../../../models/contract";
import { Checkbox } from "primereact/checkbox";
import useToggle from "../../../hooks/useToggle";
import { ScrollPanel } from "primereact/scrollpanel";
import UserFormContractStatic from "../../../components/term-and-conditions/UserFormContractStatic";
import { useContext } from "react";
import { UserFormContext } from "../WrapperUserForm";

export interface ContractCardProps {
  contract?: ContractGetDto;
}

const ContractCard = ({ contract }: ContractCardProps) => {
  const { formDetails } = useContext(UserFormContext);
  const { value, toggle } = useToggle();

  return (
    <Card title={contract?.title}>
      <ScrollPanel style={{ height: "300px" }}>
        <UserFormContractStatic formDetails={formDetails}>
          <div dangerouslySetInnerHTML={{ __html: contract?.html || "" }}></div>
        </UserFormContractStatic>
      </ScrollPanel>
      <div className="checkbox-container" style={{ marginTop: "20px" }}>
        <Checkbox required checked={value} onChange={() => toggle()} />
        <span>Acepto el contrato que acabo de leer</span>
      </div>
    </Card>
  );
};

export default ContractCard;
