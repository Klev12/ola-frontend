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
import { InputTextarea } from "primereact/inputtextarea";
import { Tag } from "primereact/tag";
import { ScrollPanel } from "primereact/scrollpanel";
import { InputNumber } from "primereact/inputnumber";

const GlobalContracts = () => {
  const { data: contractData, refetch: refetchAllContracts } = useQuery({
    queryFn: () => getAllContracts().then((res) => res.data),
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

  return (
    <div style={{ display: "grid", gap: "20px" }}>
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
                    showEditMenu.setTrue();
                  }}
                />
                <Tag value={contract.type} />
              </div>
            }
            title={contract.title}
            footer={
              [
                ContractType.graphicDesign,
                ContractType.marketing,
                ContractType.sales,
              ].includes(contract.type) && (
                <Card>
                  <p>Proyecto {contract.project} + IVA</p>
                  <p>Mensualidades 9, de {contract.monthly_payment}</p>
                  <p>Subscripción {contract.suscription}</p>
                </Card>
              )
            }
          >
            <ScrollPanel style={{ height: "100%", maxHeight: "100px" }}>
              {contract.description}
            </ScrollPanel>
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
          maxWidth: "450px",
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
              description: formData["description"].toString(),
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
            });
          }}
        >
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
            <InputTextarea
              required
              defaultValue={selectedContract?.description}
              name="description"
              style={{ height: "150px" }}
            />
          </div>
          {[
            ContractType.graphicDesign,
            ContractType.marketing,
            ContractType.sales,
          ].includes(selectedContract?.type as ContractType) && (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <label htmlFor="">Valor del proyecto</label>
                <InputNumber
                  minFractionDigits={2}
                  mode="decimal"
                  required
                  value={parseFloat(selectedContract?.project as string)}
                  name="project"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <label htmlFor="">Valor mensual</label>
                <InputNumber
                  minFractionDigits={2}
                  mode="decimal"
                  required
                  value={parseFloat(
                    selectedContract?.monthly_payment as string
                  )}
                  defaultValue={selectedContract?.monthly_payment}
                  name="monthlyPayment"
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <label htmlFor="">Valor de suscripción</label>
                <InputNumber
                  minFractionDigits={2}
                  mode="decimal"
                  required
                  value={parseFloat(selectedContract?.suscription as string)}
                  defaultValue={selectedContract?.suscription}
                  name="suscription"
                />
              </div>
            </>
          )}
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
