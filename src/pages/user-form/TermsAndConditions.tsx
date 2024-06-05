import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { useState } from "react";
import "./styles/terms-and-conditions.css";
import { useNavigate } from "react-router";
import { useMutation } from "react-query";
import { verifyForm } from "../../services/forms-service";
import ROUTES from "../../consts/routes";
import useGlobalState from "../../store/store";

const TermsAndConditions = () => {
  const navigate = useNavigate();
  const userFormId = useGlobalState((state) => state.userFormId);
  const { mutate: verifyFormMutate } = useMutation(verifyForm, {
    onSuccess: () => {
      navigate(ROUTES.USER_FORM.DOCUMENTS);
    },
  });
  const [checked, setChecked] = useState<boolean>(false);
  const [secondChecked, setSecondChecked] = useState<boolean>(false);
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
        <Card title="Términos y condiciones" className="terms-card">
          <div className="m-0 terms-text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
            sed consequuntur error repudiandae numquam deserunt quisquam
            repellat libero asperiores earum nam nobis, culpa ratione quam
            perferendis esse, cupiditate neque quas!
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
        <Divider />
        <Card title="Términos y condiciones" className="terms-card">
          <div className="m-0 terms-text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
            sed consequuntur error repudiandae numquam deserunt quisquam
            repellat libero asperiores earum nam nobis, culpa ratione quam
            perferendis esse, cupiditate neque quas!
            <div className="checkbox-container">
              <Checkbox
                required
                onChange={(e) => setSecondChecked(e.checked as boolean)}
                checked={secondChecked}
              ></Checkbox>
              <span className="checkbox-label">
                Acepto todos los términos y condiciones
              </span>
            </div>
          </div>
        </Card>
        <Checkbox
          required
          onChange={(e) => setThirdChecked(e.checked as boolean)}
          checked={thirdChecked}
        ></Checkbox>
        <span className="checkbox-label">
          Acepto que acabo de leer los dos enunciados anteriormente.
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
