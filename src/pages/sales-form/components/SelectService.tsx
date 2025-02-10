import { useQuery } from "react-query";
import serviceHandler from "../../../services/service-handler";
import { useContext, useMemo } from "react";
import { SalesFormContext } from "./WrapperSalesForm";
import serviceOptionHandler from "../../../services/service-option-handler";
import { ServiceType } from "../../../models/service";

const SelectService = () => {
  const { formInfo } = useContext(SalesFormContext);

  const { data: servicesData } = useQuery({
    queryFn: () =>
      serviceHandler
        .findAll({ options: { page: 1, limit: 20 } })
        .then((res) => res.data),
    queryKey: ["services"],
  });

  const { data: serviceOptionsData } = useQuery({
    queryFn: () =>
      serviceOptionHandler
        .findAll({
          options: { page: 1, limit: 20 },
          serviceId: formInfo?.form_service?.serviceId,
        })
        .then((res) => res.data),
    queryKey: ["service-options"],
  });

  const saleService = useMemo(() => {
    const service = servicesData?.services.find(
      (service) => service.id === formInfo?.form_service?.serviceId
    );
    const option = serviceOptionsData?.serviceOptions.find(
      (serviceOption) =>
        serviceOption.id === formInfo?.form_service?.serviceOptionId
    );

    return { service, option };
  }, [serviceOptionsData, servicesData, formInfo]);

  return (
    <div>
      <h2 className="subtitle">Servicio</h2>
      <div>{saleService.service?.title}</div>
      <h3 className="subtitle">
        {saleService.service?.type === ServiceType.normal ? "Opción" : "Plan"}
      </h3>
      <div>{saleService.option?.title}</div>
    </div>
  );
};

export default SelectService;
