import { useQuery } from "react-query";
import { getAllSales } from "../../services/sales-service";
import { Card } from "primereact/card";

const History = () => {
  const { data: salesData } = useQuery({
    queryFn: () => getAllSales().then((res) => res.data),
  });

  return (
    <div>
      {salesData?.forms.length === 0 && <div>No hay ventas aún</div>}
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
          </Card>
        );
      })}
    </div>
  );
};

export default History;
