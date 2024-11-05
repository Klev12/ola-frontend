import { TabPanel, TabView } from "primereact/tabview";
import DoneForms from "./DoneForms";

const History = () => {
  return (
    <div className="card">
      <TabView>
        <TabPanel header="Mis ventas">
          <DoneForms lastMonth={true} />
        </TabPanel>
        {/* <TabPanel header="Transacciones">
          <Outlet />
        </TabPanel>
        <TabPanel header="Comisiones">
          <Outlet />
        </TabPanel> */}
      </TabView>
    </div>
  );
};

export default History;
