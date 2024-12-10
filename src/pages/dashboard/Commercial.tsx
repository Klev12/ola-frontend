import { TabPanel, TabView } from "primereact/tabview";
import { Outlet } from "react-router";
import useTabViewRoutes from "../../hooks/useTabViewRoutes";
import ROUTES from "../../consts/routes";

const Commercial = () => {
  const { activeIndex, onBeforeTabChange } = useTabViewRoutes({
    routes: [
      ROUTES.DASHBOARD.COMMERCIAL.SALES,
      ROUTES.DASHBOARD.COMMERCIAL.TRANSACTIONS,
      ROUTES.DASHBOARD.COMMERCIAL.COMMISSIONS,
    ],
  });

  return (
    <div>
      <TabView activeIndex={activeIndex} onBeforeTabChange={onBeforeTabChange}>
        <TabPanel header="Ventas">
          <Outlet />
        </TabPanel>
        <TabPanel header="Transacciones">
          <Outlet />
        </TabPanel>
        <TabPanel header="Comisiones">
          <Outlet />
        </TabPanel>
      </TabView>
    </div>
  );
};

export default Commercial;
