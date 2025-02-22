import { Button } from "primereact/button";
import { useMutation } from "react-query";
import { generateLink, invalidateLink } from "../../../services/forms-service";
import { useContext, useRef } from "react";
import { SalesFormContext } from "./WrapperSalesForm";
import { FormHashAccess } from "../../../models/forms";
import ROUTES from "../../../consts/routes";
import Timer from "../../../components/Timer";
import { PrimeIcons } from "primereact/api";
import copyText from "../../../utils/copy-text";
import { Toast } from "primereact/toast";

const GenerateSignatureLinkButton = () => {
  const toast = useRef<Toast>(null);

  const { formInfo, refetchForm } = useContext(SalesFormContext);

  const { mutate: generateLinkMutate, isLoading } = useMutation(generateLink, {
    onSuccess: () => {
      refetchForm();
    },
  });

  const { mutate: invalidateLinkMutate } = useMutation(invalidateLink, {
    onSuccess: () => {
      refetchForm();
    },
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Toast ref={toast} />
      <div style={{ fontWeight: "bold", fontSize: "24px" }}>Firma</div>
      {formInfo?.hash && (
        <Timer expiryTimestamp={new Date(formInfo?.expire_hash_time || "")} />
      )}
      {formInfo?.hash && (
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            alignItems: "end",
          }}
        >
          <a
            target="_blank"
            href={`${window.location.origin}${ROUTES.GENERATE_SALES_FORM.HASH(
              formInfo?.hash as string
            )}`}
          >{`${window.location.origin}${ROUTES.GENERATE_SALES_FORM.HASH(
            formInfo?.hash as string
          )}`}</a>
          <Button
            type="button"
            icon={PrimeIcons.COPY}
            onClick={() => {
              copyText(
                `${window.location.origin}${ROUTES.GENERATE_SALES_FORM.HASH(
                  formInfo?.hash as string
                )}`
              );
              toast.current?.show({
                severity: "success",
                summary: "Link copiado",
              });
            }}
          />
        </div>
      )}
      {formInfo?.hash ? (
        <Button
          type="button"
          style={{ width: "fit-content" }}
          severity="danger"
          label="Invalidar link"
          onClick={() => {
            invalidateLinkMutate({ id: formInfo.id as number });
          }}
        />
      ) : (
        <Button
          type="button"
          style={{ width: "fit-content" }}
          label="Generar link para firma"
          loading={isLoading}
          disabled={isLoading || formInfo?.done}
          onClick={() => {
            generateLinkMutate({
              id: formInfo?.id as number,
              hashAccess: FormHashAccess.onlySignature,
            });
          }}
        />
      )}
    </div>
  );
};

export default GenerateSignatureLinkButton;
