import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { useNavigate } from "react-router";

const GoBackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      icon={PrimeIcons.CHEVRON_LEFT}
      onClick={() => navigate(-1)}
      outlined
    />
  );
};

export default GoBackButton;
