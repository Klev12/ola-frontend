import { useMemo } from "react";
import { FieldIdentifier, FormGroup } from "../models/form-scheme";

interface ContractHeaderProps {
  formGroups: FormGroup[];
}

const ContractHeader = ({ formGroups }: ContractHeaderProps) => {
  const fields = useMemo(() => {
    const allowedFields = [
      FieldIdentifier.lastNames,
      FieldIdentifier.names,
      FieldIdentifier.cardId,
    ];
    return formGroups
      .flatMap((formGroup) => formGroup.fields)
      .flat()
      .filter((field) => allowedFields.includes(field.identifier))
      .map((field) => ({
        identifier: field.identifier,
        result: field.results?.[0]?.response?.value,
        id: field.id,
      }));
  }, [formGroups]);

  console.log(fields);

  return (
    <div style={{ marginBottom: "20px" }}>
      {" "}
      COMPARECIENTES: Comparecen a la celebración del presente contrato por una
      parte OLABUSINESS SAS, CON RUC 0195142890001, con represéntate legal el
      Sr. Christian Guapisaca Cabrera por otra parte{" "}
      {
        fields.find((field) => field.identifier === FieldIdentifier.names)
          ?.result
      }{" "}
      {
        fields.find((field) => field.identifier === FieldIdentifier.lastNames)
          ?.result
      }{" "}
      por sus propios derechos con RUC/CÉDULA{" "}
      {
        fields.find((field) => field.identifier === FieldIdentifier.cardId)
          ?.result
      }
      . en calidad de ‘‘BENEFICIARIO’’, siendo los comparecientes mayores de
      edad y en general capaces para celebrar todo acto y contrato ante la ley.
    </div>
  );
};

export default ContractHeader;
