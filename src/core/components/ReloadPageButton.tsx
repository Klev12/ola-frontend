import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";

const ReloadPageButton = () => {
  return (
    <Button
      size="small"
      outlined
      icon={PrimeIcons.REFRESH}
      rounded
      style={{ margin: "10px" }}
      onClick={() => {
        window.location.reload();
      }}
    />
  );
};

export default ReloadPageButton;
