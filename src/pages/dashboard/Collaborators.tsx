import { Collaborator } from "../../models/collaborator";
import useGlobalState from "../../store/store";
import RecursiveCollaboratorList from "./components/RecursiveCollaboratorList";

const Collaborators = () => {
  const authenticatedUser = useGlobalState((state) => state.user);

  return (
    <div>
      <RecursiveCollaboratorList
        collaborator={
          {
            user: {
              code: authenticatedUser?.code,
              fullname: authenticatedUser?.fullname,
              collaborators: authenticatedUser?.collaborators,
            },
          } as Collaborator
        }
      />
    </div>
  );
};

export default Collaborators;
