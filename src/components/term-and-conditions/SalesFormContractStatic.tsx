import { ReactNode } from "react";
import { FormDetails } from "../../models/forms";
import formatDateEs from "../../utils/format-date-es";

interface SalesFormContractStatic {
  children?: ReactNode;
  formDetails?: FormDetails;
}

const SalesFormContractStatic = ({
  children,
  formDetails,
}: SalesFormContractStatic) => {
  return (
    <div>
      <div>
        <p>
          En Cuenca, {formatDateEs(formDetails?.createdAt || "")}.
          COMPARECIENTES: Comparecen a la celebración del presente contrato de
          políticas de OLABUSINESS SAS, CON RUC 0195142890001, por otra parte
          {`${formDetails?.userNames} ${formDetails?.userLastNames}`} por sus
          propios derechos con RUC/CÉDULA {formDetails?.cardId} en calidad de
          ‘‘BENEFICIARIO’’, siendo los comparecientes mayores de edad y en
          general capaces para celebrar todo acto y contrato ante la ley.
        </p>
      </div>
      {children}
    </div>
  );
};

export default SalesFormContractStatic;
