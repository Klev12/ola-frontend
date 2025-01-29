import { useContext, useEffect } from "react";
import { MenuSelectContext } from "./MenuSelect";
import { MenuEditorContext } from "../MenuEditor";

interface MenuOptionProps {
  label?: string;
  value: string | number;
}

const MenuOption = ({ value, label }: MenuOptionProps) => {
  const { enableEditionMode } = useContext(MenuEditorContext);
  const { addOption, defaultValue } = useContext(MenuSelectContext);
  useEffect(() => {
    addOption({ label, value });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [label, value]);

  return (
    <>{!enableEditionMode && value === defaultValue && <div>{label}</div>}</>
  );
};

export default MenuOption;
