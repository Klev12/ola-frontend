import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { useState } from "react";
import "./styles/terms-and-conditions.css";
import { useNavigate } from "react-router";
import ROUTES from "../../consts/routes";

const TermsAndConditions = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState<boolean>(false);
  const [secondChecked, setSecondChecked] = useState<boolean>(false);
  return (
    <form className="terms-container">
      <Card title="Términos y condiciones" className="terms-card">
        <p className="m-0 terms-text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
          sed consequuntur error repudiandae numquam deserunt quisquam repellat
          libero asperiores earum nam nobis, culpa ratione quam perferendis
          esse, cupiditate neque quas!
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
        </p>
      </Card>
      <Divider />
      <Card title="Términos y condiciones" className="terms-card">
        <p className="m-0 terms-text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
          sed consequuntur error repudiandae numquam deserunt quisquam repellat
          libero asperiores earum nam nobis, culpa ratione quam perferendis
          esse, cupiditate neque quas!
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
        </p>
      </Card>
      <Button label="Siguiente" className="next-button"></Button>
    </form>
  );
};

export default TermsAndConditions;
