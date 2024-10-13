import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { useContext } from "react";
import { SaleMenuContext } from "./CreateSaleMenu";

const BackButton = () => {
  const { stepper } = useContext(SaleMenuContext);

  return (
    <Button
      outlined
      icon={PrimeIcons.ANGLE_LEFT}
      onClick={() => {
        stepper?.current?.prevCallback();
      }}
    />
  );
};

export default BackButton;
