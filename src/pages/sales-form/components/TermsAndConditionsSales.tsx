import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import useToggle from "../../../hooks/useToggle";
import { useContext } from "react";
import { SalesFormContext } from "./WrapperSalesForm";
import { ScrollPanel } from "primereact/scrollpanel";
import ConfidentialityContractStatic from "../../../components/term-and-conditions/ConfidentialityContractStatic";

const TermsAndConditionsSales = () => {
  const { formInfo, formDetails } = useContext(SalesFormContext);

  const { value, toggle } = useToggle();

  return (
    <Card>
      <h2>{formInfo?.term_and_condition.title}</h2>
      <ScrollPanel style={{ height: "300px" }}>
        <ConfidentialityContractStatic formDetails={formDetails}>
          <div
            dangerouslySetInnerHTML={{
              __html: formInfo?.term_and_condition.html || "",
            }}
          ></div>
        </ConfidentialityContractStatic>
      </ScrollPanel>
      <div style={{ marginTop: "20px" }}>
        <span>
          Yo {`${formDetails?.userNames} ${formDetails?.userLastNames} `}
          estoy de acuerdo.
        </span>
        <Checkbox required checked={value} onChange={() => toggle()} />
      </div>
    </Card>
  );
};

export default TermsAndConditionsSales;
