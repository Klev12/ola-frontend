import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { useState } from "react";
import "./styles/terms-and-conditions.css";
import { useNavigate } from "react-router";
import { useMutation } from "react-query";
import { verifyForm } from "../../services/forms-service";
import ROUTES from "../../consts/routes";
import useGlobalState from "../../store/store";
import TermsAndConditionsCard from "./components/TermsAndConditionsCard";
import ContractCard from "./components/ContractCard";

const TermsAndConditions = () => {
  const navigate = useNavigate();
  const userFormId = useGlobalState((state) => state.userFormId);

  const { mutate: verifyFormMutate } = useMutation(verifyForm, {
    onSuccess: () => {
      navigate(ROUTES.USER_FORM.DOCUMENTS);
    },
  });

  const userFormNames = useGlobalState((state) => state.userFormNames);
  const userFormLastNames = useGlobalState((state) => state.userFormLastNames);
  const userIdCard = useGlobalState((state) => state.userIdCard);
  const currentUserForm = useGlobalState((state) => state.currentUserForm);

  const [thirdChecked, setThirdChecked] = useState<boolean>(false);

  return (
    <div className="terms-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("hello");
          verifyFormMutate(userFormId as number);
        }}
      >
        <>
          <ContractCard contract={currentUserForm?.user_form?.contract} />
          <TermsAndConditionsCard
            termAndConditions={currentUserForm?.user_form?.term_and_condition}
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
          {`${userFormNames?.toLocaleUpperCase()} ${userFormLastNames?.toLocaleUpperCase()} con la identificación ${userIdCard} `}
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
