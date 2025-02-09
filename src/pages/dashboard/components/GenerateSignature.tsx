import { Toast } from "primereact/toast";
import Timer from "../../../components/Timer";
import { Button } from "primereact/button";
import copyText from "../../../utils/copy-text";
import { FormGetDto, FormHashAccess } from "../../../models/forms";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { generateLink, invalidateLink } from "../../../services/forms-service";
import ROUTES from "../../../consts/routes";
import { PrimeIcons } from "primereact/api";

interface GenerateSignatureProps {
  formInfo?: FormGetDto;
}

const GenerateSignature = ({ formInfo }: GenerateSignatureProps) => {
  const toast = useRef<Toast>(null);

  const [hash, setHash] = useState<string | undefined | null>(null);

  useEffect(() => {
    setHash(formInfo?.hash);
  }, [formInfo]);

  const { mutate: generateLinkMutate, isLoading } = useMutation(generateLink, {
    onSuccess: (response) => {
      console.log(response.form.hash);
      setHash(response.form.hash);
    },
  });

  const { mutate: invalidateLinkMutate } = useMutation(invalidateLink, {
    onSuccess: () => {
      setHash(null);
    },
  });

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Toast ref={toast} />
        <div style={{ fontWeight: "bold", fontSize: "24px" }}>Firma</div>
        {hash && (
          <Timer expiryTimestamp={new Date(formInfo?.expire_hash_time || "")} />
        )}
        {hash && (
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
                hash
              )}`}
            >{`${window.location.origin}${ROUTES.GENERATE_SALES_FORM.HASH(
              hash
            )}`}</a>
            <Button
              type="button"
              icon={PrimeIcons.COPY}
              onClick={() => {
                copyText(
                  `${window.location.origin}${ROUTES.GENERATE_SALES_FORM.HASH(
                    hash
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
        {hash ? (
          <Button
            type="button"
            style={{ width: "fit-content" }}
            severity="danger"
            label="Invalidar link"
            onClick={() => {
              invalidateLinkMutate({ id: formInfo?.id as number });
            }}
          />
        ) : (
          <Button
            type="button"
            style={{ width: "fit-content" }}
            label="Generar link para firma"
            loading={isLoading}
            onClick={() => {
              generateLinkMutate({
                id: formInfo?.id as number,
                hashAccess: FormHashAccess.onlySignature,
              });
            }}
          />
        )}
      </div>
    </>
  );
};

export default GenerateSignature;
