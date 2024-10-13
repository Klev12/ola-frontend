import { useContext, useMemo } from "react";
import { SaleMenuContext } from "./CreateSaleMenu";
import { ContractIds } from "../../../../consts/const";
import SelectServiceList from "./SelectServiceList";
import SelectCourseList from "./SelectCourseList";
import BackButton from "./BackButton";

const OptionsBasedInContract = () => {
  const { sale } = useContext(SaleMenuContext);

  const contract = useMemo(() => {
    return sale?.contract;
  }, [sale]);

  return (
    <div>
      <BackButton />
      <h2>{contract?.tag}</h2>
      {contract?.id === ContractIds.ola && <SelectServiceList />}
      {contract?.id === ContractIds.projectHub && <SelectCourseList />}
    </div>
  );
};

export default OptionsBasedInContract;
