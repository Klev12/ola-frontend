import { useMemo } from "react";
import { Field, FieldIdentifier, FormGroup } from "../models/form-scheme";
import { FormDetails } from "../models/forms";

const getResponse = (identifier: FieldIdentifier, fields: Field[]) => {
  return fields.find((field) => field.identifier === identifier)?.results?.[0]
    ?.response?.value;
};

const useFormDetails = (formGroups: FormGroup[]) => {
  const formDetails = useMemo(() => {
    const fields = formGroups
      .flatMap((formGroup) => formGroup.fields)
      .flat()
      .filter((field) => {
        const allowedFields = [
          FieldIdentifier.cardId,
          FieldIdentifier.lastNames,
          FieldIdentifier.names,
        ];

        return allowedFields.includes(field.identifier);
      });

    return {
      cardId: getResponse(FieldIdentifier.cardId, fields),
      storeName: "",
      userLastNames: getResponse(FieldIdentifier.lastNames, fields),
      userNames: getResponse(FieldIdentifier.names, fields),
    } as FormDetails;
  }, [formGroups]);

  return formDetails;
};

export default useFormDetails;
