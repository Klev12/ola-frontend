import { useContext, useEffect, useState } from "react";
import { FilterContext } from "../FilterElement";
import ShowElementList from "../ShowElementList";
import { DataTable } from "primereact/datatable";
import { TeamGetDto } from "../../../models/team";
import { Column } from "primereact/column";
import useToggle from "../../../hooks/useToggle";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Card } from "primereact/card";
import { PrimeIcons } from "primereact/api";
import { UserArea } from "../../../models/user";
import { SaleGetDto } from "../../../models/sale";
import saleService from "../../../services/sale-service";

const SaleFilter = () => {
  const { setParams, params, removeAllFilter } = useContext(FilterContext);

  const showFormList = useToggle();
  const [selectedForm, setSelectedForm] = useState<SaleGetDto | undefined>(
    undefined
  );

  useEffect(() => {
    if (removeAllFilter) {
      setSelectedForm(undefined);
    }
  }, [removeAllFilter]);

  return (
    <div>
      <Card>
        {selectedForm && (
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <span>{selectedForm?.code}</span>
            <Tag
              style={{ width: "fit-content" }}
              value={selectedForm?.contractTag}
            />
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
            label="Fitrar por formulario"
            onClick={() => showFormList.setTrue()}
          />
          <Button
            outlined
            style={{ position: "relative", right: "0" }}
            size="small"
            rounded
            icon={PrimeIcons.TIMES}
            onClick={() => {
              setSelectedForm(undefined);
              setParams({ ...params, formId: null });
            }}
          />
        </div>
      </Card>
      <Dialog
        draggable={false}
        visible={showFormList.value}
        header="Equipos"
        onHide={() => showFormList.setFalse()}
        style={{ width: "90vw", maxWidth: "700px", minWidth: "200px" }}
      >
        <ShowElementList
          expanded={true}
          params={{ values: { area: UserArea.commercial } }}
          url={saleService.api.base}
          allElement={(teams: TeamGetDto[]) => (
            <DataTable value={teams}>
              <Column header="Código de formulario" field="code" />
              <Column header="Creado por" field="userFullname" />
              <Column header="Código de creador" field="userCode" />
              <Column header="Tipo" field="contractTag" />
              <Column
                header="Filtrar"
                body={(sale: SaleGetDto) => (
                  <Button
                    icon={PrimeIcons.FILTER}
                    onClick={() => {
                      setSelectedForm(sale);
                      setParams({ ...params, formId: sale.id });
                      showFormList.setFalse();
                    }}
                  />
                )}
              />
            </DataTable>
          )}
        />
      </Dialog>
    </div>
  );
};

export default SaleFilter;
