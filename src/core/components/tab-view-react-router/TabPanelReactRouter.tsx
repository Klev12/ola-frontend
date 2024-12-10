import { TabPanel } from "primereact/tabview";
import { ReactNode } from "react";

interface TabPanelReactRouterProps {
  header?: string;
  children?: ReactNode;
}

const TabPanelReactRouter = ({
  header,
  children,
}: TabPanelReactRouterProps) => {
  console.log(header);
  return <TabPanel header={header}>{children}</TabPanel>;
};

export default TabPanelReactRouter;
