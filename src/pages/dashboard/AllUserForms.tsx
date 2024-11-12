import { Column } from "primereact/column";
import { FormGetDto } from "../../models/forms";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { DataTable } from "primereact/datatable";
import SearchInput from "../../components/SearchInput";
import { getAllForms } from "../../services/forms-service";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { useState } from "react";
import ROUTES from "../../consts/routes";
import PaginatorPage from "../../components/PaginatorPage";
import formatDate from "../../utils/format-date";

const AllUserForms = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [keyword, setKeyword] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const { data: salesFormData } = useQuery({
    queryFn: () =>
      getAllForms({
        type: "userform",
        page: currentPage + 1,
        limit: 10,
        keyword,
      }).then((res) => res.data),
    queryKey: ["all-user-form", currentPage, keyword],
  });

  return (
    <div>
      <SearchInput
        placeholder="Código"
        onSearch={(keyword) => setKeyword(keyword)}
      />
      <DataTable
        value={salesFormData?.forms}
        emptyMessage="No hay formularios de usuarios"
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
        <Column header="Código de usuario" field="user.code" />

        <Column
          header="Revisar"
          body={(value: FormGetDto) => (
            <Button
              icon={PrimeIcons.EYE}
              label="Revisar"
              onClick={() =>
                navigate(ROUTES.DASHBOARD.CHECK_USER_FORM_ID(value.user_id))
              }
            />
          )}
        />
        <Column
          header="Verificación"
          body={(value: FormGetDto) => (
            <Tag
              severity={value.user?.is_form_verified ? "success" : "info"}
              value={
                value.user?.is_form_verified ? "Verificado" : "Sin verificar"
              }
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

export default AllUserForms;
