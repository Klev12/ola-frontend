import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { TermAndConditionsGetDto } from "../../../models/term-and-conditions";
import useToggle from "../../../hooks/useToggle";
import { ScrollPanel } from "primereact/scrollpanel";
import { FormDetails } from "../../../models/forms";
import { useContext } from "react";
import { UserFormContext } from "../WrapperUserForm";
import ConfidentialityContractStatic from "../../../components/term-and-conditions/ConfidentialityContractStatic";

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
        <ScrollPanel style={{ height: "300px" }}>
          <ConfidentialityContractStatic formDetails={formDetails}>
            <div
              dangerouslySetInnerHTML={{
                __html: termAndConditions?.html || "",
              }}
            ></div>
          </ConfidentialityContractStatic>
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
