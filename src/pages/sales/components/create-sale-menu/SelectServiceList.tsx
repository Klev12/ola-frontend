import { useQuery } from "react-query";
import serviceHandler from "../../../../services/service-handler";
import { Dropdown } from "primereact/dropdown";
import { useContext, useEffect, useMemo, useState } from "react";
import serviceOptionHandler from "../../../../services/service-option-handler";
import {
  ServiceGetDto,
  ServiceOptionGetDto,
  ServiceType,
} from "../../../../models/service";
import { Button } from "primereact/button";
import { SaleMenuContext } from "./CreateSaleMenu";

interface SelectedService {
  service?: ServiceGetDto;
  serviceOption?: ServiceOptionGetDto;
}

interface SelectServiceListProps {
  onSelect?: (item: SelectedService) => void;
}

const SelectServiceList = ({ onSelect }: SelectServiceListProps) => {
  const { setSale, stepper, sale } = useContext(SaleMenuContext);

  const [selectedServiceId, setSelectedServiceId] = useState<
    number | undefined
  >(sale?.service?.id);
  const [selectedOptionId, setSelectedOptionId] = useState<number | undefined>(
    sale?.serviceOption?.id
  );

  const { data: servicesData, isRefetching: isRefetchingServices } = useQuery({
    queryFn: () =>
      serviceHandler
        .findAll({ options: { limit: 20, page: 1 } })
        .then((res) => res.data),
    queryKey: ["services"],
    refetchOnWindowFocus: false,
  });

  const { data: serviceOptionsData, isRefetching: isRefetchingOptions } =
    useQuery({
      queryFn: () =>
        serviceOptionHandler
          .findAll({
            options: { limit: 20, page: 1 },
            serviceId: selectedServiceId,
          })
          .then((res) => res.data),
      queryKey: ["service-options", selectedServiceId],
      refetchOnWindowFocus: false,
    });

  const selectedService = useMemo(() => {
    return servicesData?.services.find(
      (service) => service.id === selectedServiceId
    );
  }, [selectedServiceId, servicesData]);

  const selectedOption = useMemo(() => {
    return serviceOptionsData?.serviceOptions.find(
      (option) => option.id === selectedOptionId
    );
  }, [selectedOptionId, serviceOptionsData]);

  useEffect(() => {
    if (!!selectedOption && !!selectedService) {
      if (onSelect)
        onSelect({ service: selectedService, serviceOption: selectedOption });
    }
  }, [selectedOption, selectedService, onSelect]);

  const service = useMemo(() => {
    return servicesData?.services.find(
      (service) => service.id === selectedServiceId
    );
  }, [servicesData, selectedServiceId]);

  const serviceOption = useMemo(() => {
    return serviceOptionsData?.serviceOptions.find(
      (serviceOption) => serviceOption.id === selectedOptionId
    );
  }, [serviceOptionsData, selectedOptionId]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <h3>Servicios</h3>
      <Dropdown
        required
        loading={isRefetchingServices || isRefetchingOptions}
        disabled={isRefetchingServices || isRefetchingOptions}
        value={selectedServiceId}
        options={servicesData?.services.map((service) => ({
          value: service.id,
          label: service.title,
        }))}
        onChange={(e) => {
          setSelectedServiceId(e.value);
          setSelectedOptionId(undefined);
        }}
      />
      <div
        style={{
          marginLeft: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <span style={{ fontWeight: "bold" }}>
          {selectedService?.type === ServiceType.normal ? "Opciones" : "Planes"}
        </span>
        <Dropdown
          required
          loading={isRefetchingServices || isRefetchingOptions}
          disabled={
            isRefetchingServices || isRefetchingOptions || !selectedServiceId
          }
          value={selectedOptionId}
          options={serviceOptionsData?.serviceOptions.map((option) => ({
            value: option.id,
            label: option.title,
          }))}
          onChange={(e) => {
            setSelectedOptionId(e.value);
          }}
        />
      </div>
      <Button
        label="Siguiente"
        style={{ width: "fit-content" }}
        disabled={!selectedOptionId || !selectedServiceId}
        onClick={() => {
          setSale({ ...sale, service, serviceOption });
          stepper?.current?.nextCallback();
        }}
      />
    </div>
  );
};

export default SelectServiceList;
