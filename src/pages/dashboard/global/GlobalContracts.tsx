import { useMutation, useQuery } from "react-query";
import {
  getAllContracts,
  patchContract,
} from "../../../services/contract-service";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { ContractGetDto, ContractType } from "../../../models/contract";
import useToggle from "../../../hooks/useToggle";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";

import { Editor } from "primereact/editor";
import { useSearchParams } from "react-router-dom";

const GlobalContracts = () => {
  const [searchParams] = useSearchParams();

  const { data: contractData, refetch: refetchAllContracts } = useQuery({
    queryFn: () =>
      getAllContracts({
        type:
          (searchParams.get("type") as ContractType) || ContractType.userForm,
      }).then((res) => res.data),
    queryKey: ["all-contracts", searchParams.get("type")],
  });

  const showEditMenu = useToggle();

  const { mutate: patchContractMutate, isLoading: updatingContract } =
    useMutation(patchContract, {
      onSuccess: () => {
        refetchAllContracts();
        showEditMenu.setFalse();
      },
    });

  const [selectedContract, setSelectedContract] = useState<ContractGetDto>();

  const [text, setText] = useState("");
  const [html, setHtml] = useState(" ");

  return (
    <div style={{ display: "grid", gap: "20px" }}>
      <h2>
        {searchParams.get("type") === ContractType.sales
          ? "Contratos de ventas"
          : "Contratos de usuarios"}
      </h2>
      {contractData?.contracts?.map((contract) => {
        return (
          <Card
            key={contract.id}
            header={
              <div style={{ margin: "10px", display: "flex", gap: "10px" }}>
                <Button
                  outlined
                  icon={PrimeIcons.PENCIL}
                  onClick={() => {
                    setSelectedContract(contract);
                    setText(contract.description);
                    setHtml(contract.html || "");
                    showEditMenu.setTrue();
                  }}
                />
                <Tag value={contract.type} />
                {contract.tag && <Tag severity={"info"} value={contract.tag} />}
              </div>
            }
            title={contract.title}
          >
            <Editor
              showHeader={false}
              name="description"
              value={contract.html || contract.description}
              readOnly
              style={{ height: "100px" }}
            />
          </Card>
        );
      })}
      <Dialog
        header={selectedContract?.title}
        draggable={false}
        visible={showEditMenu.value}
        onHide={() => showEditMenu.setFalse()}
        style={{
          width: "50vw",
          minWidth: "300px",
          maxWidth: "600px",
        }}
      >
        <form
          action=""
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "100%",
            minWidth: "100px",
            margin: "0 auto",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            const formData = Object.fromEntries(
              new FormData(e.target as HTMLFormElement)
            );

            patchContractMutate({
              contractId: selectedContract?.id as number,
              description: text,
              html: html || " ",
              title: formData["title"].toString(),
              project:
                parseFloat(
                  formData?.["project"]?.toString()?.replace(",", "")
                ) || undefined,
              monthlyPayment:
                parseFloat(
                  formData?.["monthlyPayment"]?.toString()?.replace(",", "")
                ) || undefined,
              suscription:
                parseFloat(
                  formData?.["suscription"]?.toString()?.replace(",", "")
                ) || undefined,
              tag: formData["tag"].toString(),
            });
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <label htmlFor="">Etiqueta</label>
            <InputText
              required
              defaultValue={selectedContract?.tag || ""}
              name="tag"
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <label htmlFor="">Título</label>
            <InputText
              required
              defaultValue={selectedContract?.title}
              name="title"
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <label htmlFor="">Descripción</label>
            <div className="card">
              <Editor
                name="description"
                value={selectedContract?.html || text}
                onTextChange={(e) => {
                  setText(e.textValue || "");
                  setHtml(e.htmlValue || "");
                }}
                style={{ height: "320px" }}
              />
            </div>
          </div>

          <Button
            label="Subir cambios"
            disabled={updatingContract}
            loading={updatingContract}
          />
        </form>
      </Dialog>
    </div>
  );
};

export default GlobalContracts;
