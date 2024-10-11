import { useParams } from "react-router";
import GoBackButton from "../../../components/GoBackButton";
import { useMutation, useQuery } from "react-query";
import serviceHandler from "../../../services/service-handler";
import serviceOptionHandler from "../../../services/service-option-handler";
import { Tag } from "primereact/tag";
import BasicCrudOperations from "../../../core/components/BasicCrudOperations";
import { ENV } from "../../../consts/const";
import { Button } from "primereact/button";
import useToggle from "../../../hooks/useToggle";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

const GlobalServiceOptions = () => {
  const { serviceId } = useParams();

  const showOptionMenu = useToggle();

  const { data: serviceData } = useQuery({
    queryFn: () =>
      serviceHandler
        .findById({
          serviceId: Number(serviceId),
        })
        .then((res) => res.data),
    queryKey: ["service", serviceId],
  });

  const { data: serviceOptionsData, refetch: refetchOptions } = useQuery({
    queryFn: () =>
      serviceOptionHandler
        .findAll({
          serviceId: Number(serviceId),
          options: { limit: 20, page: 1 },
        })
        .then((res) => res.data),
    queryKey: ["service-options", serviceId],
    enabled: !!serviceData?.service,
  });

  const { mutate: saveOption } = useMutation(serviceOptionHandler.save, {
    onSuccess: () => {
      refetchOptions();
      showOptionMenu.setFalse();
    },
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <GoBackButton />
      <h2>{serviceData?.service?.title}</h2>
      <Tag
        style={{ width: "fit-content" }}
        value={serviceData?.service?.type}
      />
      <Button
        style={{ width: "fit-content" }}
        label="Crear nueva opción"
        onClick={() => {
          showOptionMenu.setTrue();
        }}
      />

      <Dialog
        draggable={false}
        style={{ width: "50vw", minWidth: "200px", maxWidth: "500px" }}
        visible={showOptionMenu.value}
        onHide={() => showOptionMenu.setFalse()}
      >
        <form
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          onSubmit={(e) => {
            e.preventDefault();
            const formData = Object.fromEntries(
              new FormData(e.target as HTMLFormElement)
            );
            saveOption({
              title: formData["title"].toString(),
              description: "",
              html: "",
              price: "",
              serviceId: serviceData?.service?.id as number,
            });
          }}
        >
          <label htmlFor="">Título</label>
          <InputText required name="title" />
          <Button label="Crear opción" />
        </form>
      </Dialog>

      <BasicCrudOperations
        elements={serviceOptionsData?.serviceOptions || []}
        scheme={{
          title: {
            label: "Título",
            inputText: true,
            title: true,
          },
        }}
        identifier="id"
        patchIdentifierName="serviceOptionId"
        deleteByIdApi={`${ENV.BACKEND_ROUTE}/service-options`}
        createApi={`${ENV.BACKEND_ROUTE}/service-options`}
        patchApi={`${ENV.BACKEND_ROUTE}/service-options`}
        onAfterSuccessQuery={() => {
          refetchOptions();
        }}
      />
    </div>
  );
};

export default GlobalServiceOptions;
