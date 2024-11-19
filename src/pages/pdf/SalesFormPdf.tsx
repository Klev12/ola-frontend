import { useQuery } from "react-query";
import FormPdf from "./components/FormPdf";
import { useParams } from "react-router";
import saleService from "../../services/sale-service";
import contractService from "../../services/contract-service";
import { getAllTransactions } from "../../services/transaction-service";
import fileService from "../../services/file-service";

const SalesFormPdf = () => {
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
        const files = await fileService
          .findAll({ formId: Number(id) })
          .then((res) => res.data.files);

        return { sale: data, contract, transactions, files };
      }),
    queryKey: ["sale", id],
  });

  return (
    <div>
      {data?.sale && (
        <FormPdf
          type="sales-form"
          sale={data?.sale?.form}
          formScheme={data?.sale?.formScheme}
          metadata={{
            contract: data?.contract,
            transactions: data?.transactions,
            files: data.files,
          }}
        />
      )}
      {!data && !isLoading && <div>Error al cargar el formulario</div>}
    </div>
  );
};

export default SalesFormPdf;
