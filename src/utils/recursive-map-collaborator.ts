import { TreeNode } from "primereact/treenode";
import { Collaborator } from "../models/collaborator";

type MapperFn = (collaborator: Collaborator) => TreeNode;

export default class RecursiveMapCollaborator {
  static map(collaborator: Collaborator, mapperFn: MapperFn): TreeNode {
    const newTreeNode = mapperFn(collaborator);

    for (let element of collaborator.user.collaborators || []) {
      newTreeNode.children?.push(this.map(element, mapperFn));
    }

    return newTreeNode;
  }
}
