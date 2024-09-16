import { useMemo } from "react";
import { Field, FieldIdentifier, FormScheme } from "../models/form-scheme";
import { FormDetails, FormGetDto } from "../models/forms";

const getResponse = (identifier: FieldIdentifier, fields: Field[]) => {
  return fields.find((field) => field.identifier === identifier)?.results?.[0]
    ?.response?.value;
};

interface UseFormDetailsProps {
  formInfo?: FormGetDto;
  formScheme?: FormScheme;
}

const useFormDetails = ({ formInfo, formScheme }: UseFormDetailsProps) => {
  const formDetails = useMemo(() => {
    const fields =
      formScheme?.form_groups
        .flatMap((formGroup) => formGroup.fields)
        .flat()
        .filter((field) => {
          const allowedFields = [
            FieldIdentifier.cardId,
            FieldIdentifier.lastNames,
            FieldIdentifier.names,
            FieldIdentifier.area,
            FieldIdentifier.bussinesName,
            FieldIdentifier.costumerPhone,
            FieldIdentifier.email,
            FieldIdentifier.genre,
            FieldIdentifier.phone,
            FieldIdentifier.city,
            FieldIdentifier.agreement,
            FieldIdentifier.observations,
          ];

          return allowedFields.includes(field.identifier);
        }) || [];

    return {
      cardId: getResponse(FieldIdentifier.cardId, fields),
      storeName: getResponse(FieldIdentifier.bussinesName, fields),
      userLastNames: getResponse(FieldIdentifier.lastNames, fields),
      userNames: getResponse(FieldIdentifier.names, fields),
      area: getResponse(FieldIdentifier.area, fields),
      genre: getResponse(FieldIdentifier.genre, fields),
      city: getResponse(FieldIdentifier.city, fields),
      agreement: getResponse(FieldIdentifier.agreement, fields),
      observations: getResponse(FieldIdentifier.observations, fields),
      contractDuration: getResponse(FieldIdentifier.contractDuration, fields),
      createdAt: formInfo?.createdAt,
    } as FormDetails;
  }, [formScheme?.form_groups, formInfo]);

  return formDetails;
};

export default useFormDetails;
