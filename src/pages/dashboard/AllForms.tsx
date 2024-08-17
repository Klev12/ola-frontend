import { TabPanel, TabView } from "primereact/tabview";
import { Outlet, useLocation } from "react-router";
import useNavigateTo from "../../hooks/useNavigateTo";
import ROUTES from "../../consts/routes";

const AllForms = () => {
  const navigateTo = useNavigateTo();
  const location = useLocation();

  const pathIndex = {
    [ROUTES.DASHBOARD.FORMS_USER]: 0,
    [ROUTES.DASHBOARD.FORMS_SALES]: 1,
  };

  return (
    <>
      <TabView
        activeIndex={pathIndex[location.pathname] || 0}
        onBeforeTabChange={(tab) => {
          navigateTo({
            tabIndex: tab.index,
            index: 0,
            route: ROUTES.DASHBOARD.FORMS_USER,
          });
          navigateTo({
            tabIndex: tab.index,
            index: 1,
            route: ROUTES.DASHBOARD.FORMS_SALES,
          });
        }}
      >
        <TabPanel header="Formularios de Usuarios">
          <Outlet />
        </TabPanel>
        <TabPanel header="Formularios de Ventas">
          <Outlet />
        </TabPanel>
      </TabView>
    </>
  );
};

export default AllForms;
