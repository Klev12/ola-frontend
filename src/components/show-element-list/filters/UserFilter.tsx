import { useContext, useEffect, useState } from "react";
import FilterElement, { FilterContext } from "../FilterElement";
import { Button } from "primereact/button";
import useToggle from "../../../hooks/useToggle";
import { Dialog } from "primereact/dialog";
import { UserArea, UserGetDto } from "../../../models/user";

import ShowElementList from "../ShowElementList";
import userService from "../../../services/user-service";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { PrimeIcons } from "primereact/api";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";

const UserFilter = () => {
  const { setParams, params, removeAllFilter } = useContext(FilterContext);
  const showUsersList = useToggle();

  const [selectedUser, setSelectedUser] = useState<UserGetDto>();
  const [userParams, setUserParams] = useState({});

  useEffect(() => {
    if (removeAllFilter) {
      setSelectedUser(undefined);
      setParams({ ...params, userId: null });
    }
  }, [removeAllFilter, params, setParams]);

  return (
    <>
      <Card>
        {selectedUser && (
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <span>{selectedUser.fullname}</span>
            <Tag style={{ width: "fit-content" }} value={selectedUser.code} />
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <Button
            label="Fitrar por usuario"
            onClick={() => showUsersList.setTrue()}
          />
          <Button
            outlined
            style={{ position: "relative", right: "0" }}
            size="small"
            rounded
            icon={PrimeIcons.TIMES}
            onClick={() => {
              setSelectedUser(undefined);
              setParams({ ...params, userId: null });
            }}
          />
        </div>
      </Card>

      <Dialog
        header="Usuarios"
        visible={showUsersList.value}
        onHide={() => showUsersList.setFalse()}
        style={{ width: "90vw", maxWidth: "700px", minWidth: "200px" }}
      >
        <FilterElement
          showOwnershipFilter={false}
          filters={{
            area: {
              type: "select",
              placeholder: "Área",
              options: [
                { label: "Todos", value: "no-defined" },
                { label: "Comercial", value: UserArea.commercial },
                { label: "Administración", value: UserArea.administration },
              ],
            },
          }}
          onFilter={(params) => setUserParams(params)}
        />
        <ShowElementList
          emptyElementsMessage="No se encontraron usuarios"
          url={userService.api.base}
          expanded={true}
          params={{ values: { ...userParams } }}
          allElement={(users: UserGetDto[]) => (
            <DataTable value={users}>
              <Column header="Nombre" field="fullname" />
              <Column header="Código" field="code" />
              <Column header="Rol" field="role" />
              <Column header="Área" field="area" />
              <Column
                header="Seleccionar"
                body={(user: UserGetDto) => (
                  <Button
                    icon={PrimeIcons.SEND}
                    onClick={() => {
                      setSelectedUser(user);
                      setParams({ ...params, userId: user.id });
                      showUsersList.setFalse();
                    }}
                  />
                )}
              />
            </DataTable>
          )}
        />
      </Dialog>
    </>
  );
};

export default UserFilter;
