import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { TermAndConditionsGetDto } from "../../../models/term-and-conditions";
import useToggle from "../../../hooks/useToggle";
import { ScrollPanel } from "primereact/scrollpanel";
import { FormDetails } from "../../../models/forms";

interface TermsAndConditionsCardProps {
  termAndConditions?: TermAndConditionsGetDto;
  formDetails?: FormDetails;
}

const TermsAndConditionsCard = ({
  termAndConditions,
}: TermsAndConditionsCardProps) => {
  const { value, toggle } = useToggle();

  return (
    <Card title="Términos y condiciones" className="terms-card">
      <div className="m-0 terms-text">
        <ScrollPanel style={{ height: "300px" }}>
          <div
            dangerouslySetInnerHTML={{
              __html: termAndConditions?.html || "",
            }}
          ></div>
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
