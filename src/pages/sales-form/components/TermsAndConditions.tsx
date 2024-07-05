import { Card } from "primereact/card";
import { TermAndConditionsGetDto } from "../../../models/term-and-conditions";
import { Checkbox } from "primereact/checkbox";
import useToggle from "../../../hooks/useToggle";
import useGlobalState from "../../../store/store";

interface TermsAndConditionsProps {
  termAndConditions?: TermAndConditionsGetDto;
}

const TermsAndConditions = ({ termAndConditions }: TermsAndConditionsProps) => {
  const { value, toggle } = useToggle();
  const userFormNames = useGlobalState((state) => state.userFormNames);
  const userFormLastNames = useGlobalState((state) => state.userFormLastNames);

  return (
    <Card>
      <Checkbox required checked={value} onChange={() => toggle()} />
      <span>
        Yo {userFormNames?.toUpperCase()} {userFormLastNames?.toUpperCase()}{" "}
        estoy de acuerdo con los siguientes términos y condiciones
      </span>
      <p>{termAndConditions?.description}</p>
    </Card>
  );
};

export default TermsAndConditions;
