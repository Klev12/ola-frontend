import { useQuery } from "react-query";
import { useParams } from "react-router";
import saleService from "../../services/sale-service";
import FormPdf from "./components/FormPdf";
import contractService from "../../services/contract-service";
import { getAllTransactions } from "../../services/transaction-service";

const HubFormPdf = () => {
  const { id } = useParams();

  const { data: data, isLoading } = useQuery({
    queryFn: () =>
      saleService.findById({ formId: Number(id) }).then(async (res) => {
        const data = res.data;
        const contract = await contractService
          .findById({ contractId: data.form.contractId as number })
          .then((res) => res.data.contract);
        const transactions = await getAllTransactions({
          formId: Number(id),
        }).then((res) => res.data.transactions);

        return { sale: data, contract, transactions };
      }),
    queryKey: ["sale", id],
  });

  return (
    <div>
      {data?.sale && (
        <FormPdf
          type="hub-form"
          sale={data?.sale?.form}
          formScheme={data?.sale?.formScheme}
          metadata={{
            contract: data?.contract,
            transactions: data.transactions,
          }}
        />
      )}
      {!data && !isLoading && <div>Error al cargar el formulario</div>}
    </div>
  );
};

export default HubFormPdf;
