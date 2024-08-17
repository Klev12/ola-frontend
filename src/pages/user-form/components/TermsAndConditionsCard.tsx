import { Card } from "primereact/card";
import useGlobalState from "../../../store/store";
import { Checkbox } from "primereact/checkbox";
import { TermAndConditionsGetDto } from "../../../models/term-and-conditions";
import useToggle from "../../../hooks/useToggle";

interface TermsAndConditionsCardProps {
  termAndConditions?: TermAndConditionsGetDto;
}

const TermsAndConditionsCard = ({
  termAndConditions,
}: TermsAndConditionsCardProps) => {
  const userFormNames = useGlobalState((state) => state.userFormNames);
  const userFormLastNames = useGlobalState((state) => state.userFormLastNames);
  const userIdCard = useGlobalState((state) => state.userIdCard);

  const { value, toggle } = useToggle();

  return (
    <Card title="Términos y condiciones" className="terms-card">
      <div className="m-0 terms-text">
        {`Yo ${userFormNames?.toLocaleUpperCase()} ${userFormLastNames?.toUpperCase()} con el número de identificación ${userIdCard} `}
        {termAndConditions?.description}
        <div className="checkbox-container">
          <Checkbox
            required
            onChange={() => toggle()}
            checked={value}
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
