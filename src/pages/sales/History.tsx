import { useQuery } from "react-query";
import { getAllSales } from "../../services/sales-service";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import ROUTES from "../../consts/routes";
import { useNavigate } from "react-router";

const History = () => {
  const { data: salesData } = useQuery({
    queryFn: () => getAllSales().then((res) => res.data),
    queryKey: ["history-data"],
  });

  const navigate = useNavigate();

  return (
    <div>
      {salesData?.forms?.length === 0 && <div>No hay ventas aún</div>}
      {salesData?.forms.map((form) => {
        return (
          <Card title={form?.form_scheme?.label}>
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
          </Card>
        );
      })}
    </div>
  );
};

export default History;
