import { MemberLinkType } from "../../../models/collaborator-link";
import { TabPanel, TabView } from "primereact/tabview";
import MemberLinkList from "./member-link/MemberLinkList";

const CollaboratorLinkList = () => {
  return (
    <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
      <TabView>
        <TabPanel header="Socio">
          <MemberLinkList type={MemberLinkType.normal} />
        </TabPanel>
        <TabPanel header="Colaborador">
          <MemberLinkList type={MemberLinkType.collaborator} />
        </TabPanel>
      </TabView>
    </div>
  );
};

export default CollaboratorLinkList;
