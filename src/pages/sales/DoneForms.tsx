import { useQuery } from "react-query";
import { getAllSales } from "../../services/sales-service";
import { useNavigate } from "react-router";
import { Card } from "primereact/card";
import ROUTES from "../../consts/routes";
import { Button } from "primereact/button";
import { Paginator } from "primereact/paginator";
import TransactionsList from "./components/TransactionsList";
import { useState } from "react";
import { InputText } from "primereact/inputtext";

const DoneForms = () => {
  const [keyword, setKeyword] = useState<string | undefined>(undefined);
  const [currentPage, setCurrenPage] = useState(0);

  const { data: salesData } = useQuery({
    queryFn: () =>
      getAllSales({ page: currentPage + 1, limit: 10, keyword }).then(
        (res) => res.data
      ),
    queryKey: ["history-data", currentPage, keyword],
  });

  const navigate = useNavigate();

  return (
    <div>
      <form
        className="p-inputgroup flex-1"
        style={{ width: "30vw" }}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = Object.fromEntries(
            new FormData(e.target as HTMLFormElement)
          );
          setKeyword(formData["keyword"].toString());
        }}
      >
        <InputText placeholder="Código" name="keyword" />
        <Button icon="pi pi-search" />
      </form>
      <Paginator
        first={currentPage === 0 ? currentPage : currentPage + 10}
        totalRecords={salesData?.count}
        rows={10}
        onPageChange={(e) => {
          setCurrenPage(e.page);
        }}
      />
      {salesData?.forms?.length === 0 && <div>No hay ventas aún</div>}
      {salesData?.forms.map((form) => {
        return (
          <Card title={`${form?.form_scheme?.label} ${form.code}`}>
            <p>Vendedor: {form.user?.fullname}</p>
            <p>
              Cliente:{" "}
              {form.results.map((result, index) => {
                return <span key={index}>{result.response.value} </span>;
              })}
            </p>
            <Button
              style={{
                backgroundColor: "purple",
                border: 0,
                boxShadow: "none",
              }}
              label="Ver formulario"
              icon="pi pi-file"
              className="p-button-rounded"
              onClick={() => {
                navigate(ROUTES.DASHBOARD.CHECK_FORM_ID(form.id));
              }}
            />
            <TransactionsList form={form} transactions={form.transactions} />
          </Card>
        );
      })}
    </div>
  );
};

export default DoneForms;
