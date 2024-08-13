import { TabPanel, TabView } from "primereact/tabview";
import { Outlet } from "react-router";
import useNavigateTo from "../../hooks/useNavigateTo";
import ROUTES from "../../consts/routes";

const AllForms = () => {
  const navigateTo = useNavigateTo();

  return (
    <>
      <TabView
        onBeforeTabChange={(tab) => {
          navigateTo({
            tabIndex: tab.index,
            index: 1,
            route: ROUTES.DASHBOARD.FORMS_USER,
          });
          navigateTo({
            tabIndex: tab.index,
            index: 0,
            route: ROUTES.DASHBOARD.FORMS_SALES,
          });
        }}
      >
        <TabPanel header="Formularios de Ventas">
          <Outlet />
        </TabPanel>
        <TabPanel header="Formularios de Usuarios">
          <Outlet />
        </TabPanel>
      </TabView>
    </>
  );
};

export default AllForms;
