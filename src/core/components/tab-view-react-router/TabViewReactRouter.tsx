import { TabPanel, TabView } from "primereact/tabview";
import { ReactNode } from "react";

interface TabViewReactRouterProps {
  children?: ReactNode;
}

const TabViewReactRouter = ({ children }: TabViewReactRouterProps) => {
  return (
    <TabView
      onBeforeTabChange={(tab) => {
        console.log(tab);
      }}
    >
      <TabPanel header="aa" />
      {children}
    </TabView>
  );
};

export default TabViewReactRouter;
