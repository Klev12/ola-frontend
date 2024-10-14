import { useQuery } from "react-query";
import { useParams } from "react-router";
import saleService from "../../services/sale-service";
import FormPdf from "./components/FormPdf";
import contractService from "../../services/contract-service";

const HubFormPdf = () => {
  const { id } = useParams();

  const { data: data, isError } = useQuery({
    queryFn: () =>
      saleService.findById({ formId: Number(id) }).then(async (res) => {
        const data = res.data;
        const contract = await contractService
          .findById({ contractId: data.form.contractId as number })
          .then((res) => res.data.contract);

        return { sale: data, contract };
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
          metadata={{ contract: data?.contract }}
        />
      )}
      {!isError && <div>Error al cargar el formulario</div>}
    </div>
  );
};

export default HubFormPdf;
