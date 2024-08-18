import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
interface ExpandNavButtonProps {
  onClick?: () => void;
}

const ExpandNavButton = ({ onClick }: ExpandNavButtonProps) => {
  return (
    <Button
      outlined
      rounded
      icon={PrimeIcons.ANGLE_RIGHT}
      className="expand-nav-button"
      onClick={onClick}
    />
  );
};

export default ExpandNavButton;
