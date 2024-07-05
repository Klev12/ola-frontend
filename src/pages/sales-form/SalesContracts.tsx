import { useContext } from "react";
import { SalesContext } from "./components/SalesProvider";
import SelectContractType from "./components/SelectContractType";

const SalesContracts = () => {
  const { formData } = useContext(SalesContext);

  return (
    <div>
      <SelectContractType formId={formData?.id as number} />
    </div>
  );
};

export default SalesContracts;
