import { Tree } from "primereact/tree";
import { Collaborator } from "../../../models/collaborator";
import { useMemo } from "react";
import RecursiveMapCollaborator from "../../../utils/recursive-map-collaborator";

interface RecursiveCollaboratorListProps {
  collaborator: Collaborator;
}

const RecursiveCollaboratorList = ({
  collaborator,
}: RecursiveCollaboratorListProps) => {
  const collaboratorTreeNode = useMemo(() => {
    return RecursiveMapCollaborator.map(collaborator, (col) => ({
      key: col.id,
      label: `${col.user.fullname} ${col.user.code} ${col.user.level?.position}`,
      children: [],
    }));
  }, [collaborator]);

  return <Tree value={[collaboratorTreeNode]}></Tree>;
};

export default RecursiveCollaboratorList;
