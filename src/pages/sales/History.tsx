import { TabPanel, TabView } from "primereact/tabview";
import { Outlet } from "react-router";
import ROUTES from "../../consts/routes";
import useNavigateTo from "../../hooks/useNavigateTo";

const History = () => {
  const navigateTo = useNavigateTo();

  return (
    <div className="card">
      <TabView
        onBeforeTabChange={(tab) => {
          navigateTo({
            index: tab.index,
            tabIndex: 0,
            route: ROUTES.SALES.HISTORY_TRANSACTIONS,
          });

          navigateTo({
            index: tab.index,
            tabIndex: 1,
            route: ROUTES.SALES.HISTORY_COMMISSIONS,
          });

          navigateTo({
            index: tab.index,
            tabIndex: 2,
            route: ROUTES.SALES.HISTORY_SALES,
          });
        }}
      >
        <TabPanel header="Transacciones">
          <Outlet />
        </TabPanel>
        <TabPanel header="Comisiones">
          <Outlet />
        </TabPanel>
        <TabPanel header="Mis ventas">
          <Outlet />
        </TabPanel>
      </TabView>
    </div>
  );
};

export default History;
