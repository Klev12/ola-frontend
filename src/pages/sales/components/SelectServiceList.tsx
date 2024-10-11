import { useQuery } from "react-query";
import serviceHandler from "../../../services/service-handler";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useMemo, useState } from "react";
import serviceOptionHandler from "../../../services/service-option-handler";
import {
  ServiceGetDto,
  ServiceOptionGetDto,
  ServiceType,
} from "../../../models/service";

interface SelectedService {
  service?: ServiceGetDto;
  serviceOption?: ServiceOptionGetDto;
}

interface SelectServiceListProps {
  onSelect?: (item: SelectedService) => void;
}

const SelectServiceList = ({ onSelect }: SelectServiceListProps) => {
  const [selectedServiceId, setSelectedServiceId] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState(0);

  const { data: servicesData, isRefetching: isRefetchingServices } = useQuery({
    queryFn: () =>
      serviceHandler
        .findAll({ options: { limit: 20, page: 1 } })
        .then((res) => res.data),
    queryKey: ["services"],
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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
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
          disabled={isRefetchingServices || isRefetchingOptions}
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
    </div>
  );
};

export default SelectServiceList;
