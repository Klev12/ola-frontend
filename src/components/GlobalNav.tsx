import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import ExpandNavButton from "./ExpandNavButton";
import useToggle from "../hooks/useToggle";

interface GlobalNavProps {
  items: MenuItem[];
}

const GlobalNav = ({ items }: GlobalNavProps) => {
  const showNav = useToggle();
  console.log(showNav.value);

  return (
    <>
      <ExpandNavButton onClick={() => showNav.toggle()} />
      <Menu
        className={`nav ${showNav.value ? "--expand-nav" : "--collapse-nav"}`}
        model={items}
        onClickCapture={() => {
          showNav.setFalse();
        }}
      />
      <div
        className={`nav-overlay ${
          showNav.value ? "--show-overlay" : "--hide-overlay"
        }`}
        onClick={() => {
          showNav.setFalse();
        }}
      />
    </>
  );
};

export default GlobalNav;
