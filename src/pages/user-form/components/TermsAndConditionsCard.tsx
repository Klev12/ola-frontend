import { Card } from "primereact/card";
import { ContractGetDto } from "../../../models/contract";
import useGlobalState from "../../../store/store";
import { useState } from "react";
import { Checkbox } from "primereact/checkbox";

interface TermsAndConditionsCardProps {
  contract: ContractGetDto;
}

const TermsAndConditionsCard = ({ contract }: TermsAndConditionsCardProps) => {
  const userFormNames = useGlobalState((state) => state.userFormNames);
  const userFormLastNames = useGlobalState((state) => state.userFormLastNames);
  const userIdCard = useGlobalState((state) => state.userIdCard);

  const [checked, setChecked] = useState(false);

  return (
    <Card title="Términos y condiciones" className="terms-card">
      <div className="m-0 terms-text">
        {`Yo ${userFormNames?.toLocaleUpperCase()} ${userFormLastNames?.toUpperCase()} con el numero de identificacion ${userIdCard} `}
        {contract.description}
        <div className="checkbox-container">
          <Checkbox
            required
            onChange={(e) => setChecked(e.checked as boolean)}
            checked={checked}
          ></Checkbox>
          <span className="checkbox-label">
            Acepto todos los términos y condiciones que acabo de leer
          </span>
        </div>
      </div>
    </Card>
  );
};

export default TermsAndConditionsCard;
