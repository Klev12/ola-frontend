import { MenuItem } from "primereact/menuitem";
import { Roles, UserArea } from "../models/user";
import { useMemo } from "react";
import useGlobalState from "../store/store";

interface Restrictions {
  roles: Roles[];
  areas?: UserArea[];
  accessTo: string[];
  command?: () => void;
}

interface UserMenuRestrictionsProps {
  items: MenuItem[];
  restrictions: Restrictions[];
}

const useMenuRestrictions = ({
  items,
  restrictions,
}: UserMenuRestrictionsProps) => {
  const authenticatedUser = useGlobalState((state) => state.user);

  const restrictedItems = useMemo(() => {
    let newItems: MenuItem[] = [];

    for (const { roles, areas, accessTo, command } of restrictions) {
      if (
        roles.includes(authenticatedUser?.role as Roles) &&
        (areas ? areas.includes(authenticatedUser?.area as UserArea) : true)
      ) {
        const restrictedItem = items.filter((item) =>
          accessTo.includes(item.id as string)
        );

        if (restrictedItem) {
          newItems = [...newItems, ...restrictedItem];
        }

        if (command) {
          command();
        }
      }
    }

    return newItems;
  }, [restrictions, items, authenticatedUser]);

  return restrictedItems;
};

export default useMenuRestrictions;
