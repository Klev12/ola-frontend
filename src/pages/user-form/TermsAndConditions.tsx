import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { useContext, useState } from "react";
import "./styles/terms-and-conditions.css";
import { useNavigate } from "react-router";
import { useMutation } from "react-query";
import { verifyForm } from "../../services/forms-service";
import ROUTES from "../../consts/routes";
import TermsAndConditionsCard from "./components/TermsAndConditionsCard";
import ContractCard from "./components/ContractCard";
import { UserFormContext } from "./WrapperUserForm";

const TermsAndConditions = () => {
  const navigate = useNavigate();
  const { formInfo, formDetails } = useContext(UserFormContext);

  const { mutate: verifyFormMutate } = useMutation(verifyForm, {
    onSuccess: () => {
      navigate(ROUTES.USER_FORM.DOCUMENTS);
    },
  });

  const [thirdChecked, setThirdChecked] = useState<boolean>(false);

  return (
    <div className="terms-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          verifyFormMutate(formInfo?.id as number);
        }}
      >
        <>
          <ContractCard contract={formInfo?.contract} />
          <TermsAndConditionsCard
            termAndConditions={formInfo?.term_and_condition}
          />
        </>

        <Divider />

        <Checkbox
          required
          onChange={(e) => setThirdChecked(e.checked as boolean)}
          checked={thirdChecked}
        ></Checkbox>
        <span className="checkbox-label">
          Yo{" "}
          {`${formDetails?.userNames?.toUpperCase()} ${formDetails?.userLastNames?.toLocaleUpperCase()} con la identificación ${
            formDetails?.cardId
          } `}
          acepto que acabo de leer los dos enunciados anteriormente.
        </span>
        <Button
          type="submit"
          label="Siguiente"
          className="next-button"
          style={{ border: "0", boxShadow: "none" }}
        ></Button>
      </form>
    </div>
  );
};

export default TermsAndConditions;
