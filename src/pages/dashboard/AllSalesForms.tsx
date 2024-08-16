import { useQuery } from "react-query";
import { getAllForms } from "../../services/forms-service";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { FormGetDto } from "../../models/forms";
import { Button } from "primereact/button";
import { useRef, useState } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { useNavigate } from "react-router";
import ROUTES from "../../consts/routes";
import { PrimeIcons } from "primereact/api";
import formatDate from "../../utils/format-date";
import SearchInput from "../../components/SearchInput";
import PaginatorPage from "../../components/PaginatorPage";

const AllSalesForms = () => {
  const op = useRef<OverlayPanel>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [keyword, setKeyword] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const { data: salesFormData } = useQuery({
    queryFn: () =>
      getAllForms({
        type: "salesform",
        page: currentPage + 1,
        limit: 10,
        keyword,
      }).then((res) => res.data),
    queryKey: ["all-sales-form", currentPage, keyword],
  });

  const [selectedForm, setSelectedForm] = useState<FormGetDto | undefined>(
    undefined
  );

  return (
    <div>
      <SearchInput
        placeholder="Código"
        onSearch={(keyword) => setKeyword(keyword)}
      />
      <DataTable
        value={salesFormData?.forms}
        emptyMessage="No hay formularios de ventas"
      >
        <Column header="Código" field="code" />
        <Column
          header="Completado"
          field="done"
          body={(value: FormGetDto) => (
            <Tag
              severity={value.done ? "success" : "info"}
              value={value.done ? "Completado" : "Sin completar"}
            />
          )}
        />
        <Column header="Creado por" field="user.fullname" />
        <Column
          header="Detalles de pago"
          body={(value: FormGetDto) => (
            <>
              <Button
                outlined
                label="Ver detalles"
                onClick={(e) => {
                  setSelectedForm(value);
                  op.current?.toggle(e);
                }}
              />
              <OverlayPanel ref={op}>
                {selectedForm?.payment && (
                  <>
                    <p>Total: {selectedForm?.payment?.total}</p>
                    <p>
                      Valor suscripción:{" "}
                      {selectedForm?.payment?.subscription_value}
                    </p>
                    <p>
                      Número de cuotas: {selectedForm?.payment?.number_fees}
                    </p>
                    <p>Valor mensual: {selectedForm?.payment?.month_value}</p>
                    <p>
                      Valor restante: {selectedForm?.payment?.remaining_total}
                    </p>
                  </>
                )}
                {!selectedForm?.payment && <p>sin datos de pago</p>}
              </OverlayPanel>
            </>
          )}
        />
        <Column
          header="Revisar"
          body={(value: FormGetDto) => (
            <Button
              icon={PrimeIcons.EYE}
              label="Revisar"
              onClick={() => navigate(ROUTES.DASHBOARD.CHECK_FORM_ID(value.id))}
            />
          )}
        />
        <Column
          header="Fecha"
          field="createdAt"
          body={(value: FormGetDto) => <div>{formatDate(value.createdAt)}</div>}
        />
      </DataTable>
      <PaginatorPage
        limit={10}
        total={salesFormData?.count}
        onPage={(page) => {
          setCurrentPage(page);
        }}
      />
    </div>
  );
};

export default AllSalesForms;
