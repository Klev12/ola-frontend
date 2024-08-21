import { TabPanel, TabView } from "primereact/tabview";
import { Outlet, useLocation, useNavigate } from "react-router";
import ROUTES from "../../consts/routes";
import { useEffect, useMemo } from "react";

const tabPage: { [key: number]: string } = {
  [0]: ROUTES.DASHBOARD.GLOBAL_CONTRACTS,
  [1]: ROUTES.DASHBOARD.GLOBAL_TERMS_AND_CONDITIONS,
  [2]: ROUTES.DASHBOARD.GLOBAL_REGULATION,
};

const Global = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === ROUTES.DASHBOARD.GLOBAL) {
      navigate(ROUTES.DASHBOARD.GLOBAL_CONTRACTS);
    }
  }, [location, navigate]);

  const activateTab = useMemo(() => {
    return Object.entries(tabPage).find(
      (entry) => entry[1] === location.pathname
    )?.[0];
  }, [location]);

  return (
    <TabView
      activeIndex={Number(activateTab)}
      onTabChange={(tab) => {
        navigate(tabPage[tab.index] || "");
      }}
    >
      <TabPanel header="Contratos">
        <Outlet />
      </TabPanel>

      <TabPanel header="Términos y condiciones">
        <Outlet />
      </TabPanel>

      <TabPanel header="Reglamente interno">
        <Outlet />
      </TabPanel>
    </TabView>
  );
};

export default Global;
