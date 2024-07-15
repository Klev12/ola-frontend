import { Collaborator } from "../../models/collaborator";
import useGlobalState from "../../store/store";
import CollaboratorButton from "../home/components/CollaboratorButton";
import RecursiveCollaboratorList from "./components/RecursiveCollaboratorList";

const Collaborators = () => {
  const authenticatedUser = useGlobalState((state) => state.user);

  return (
    <div>
      <CollaboratorButton />
      <RecursiveCollaboratorList
        collaborator={
          {
            user: {
              code: authenticatedUser?.code,
              fullname: authenticatedUser?.fullname,
              collaborators: authenticatedUser?.collaborators,
              level: authenticatedUser?.level,
            },
          } as Collaborator
        }
      />
    </div>
  );
};

export default Collaborators;
