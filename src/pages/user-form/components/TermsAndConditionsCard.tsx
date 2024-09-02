import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { TermAndConditionsGetDto } from "../../../models/term-and-conditions";
import useToggle from "../../../hooks/useToggle";
import { ScrollPanel } from "primereact/scrollpanel";
import { FormDetails } from "../../../models/forms";
import { useContext } from "react";
import { UserFormContext } from "../WrapperUserForm";

interface TermsAndConditionsCardProps {
  termAndConditions?: TermAndConditionsGetDto;
  formDetails?: FormDetails;
}

const TermsAndConditionsCard = ({
  termAndConditions,
}: TermsAndConditionsCardProps) => {
  const { formDetails } = useContext(UserFormContext);

  const { value, toggle } = useToggle();

  return (
    <Card title="Términos y condiciones" className="terms-card">
      <div className="m-0 terms-text">
        {`Yo ${formDetails?.userNames?.toLocaleUpperCase()} ${formDetails?.userLastNames?.toUpperCase()} con el número de identificación ${
          formDetails?.cardId
        } `}
        <ScrollPanel style={{ height: "300px" }}>
          {termAndConditions?.description}
        </ScrollPanel>
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
