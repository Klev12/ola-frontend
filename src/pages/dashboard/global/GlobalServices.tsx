import { useQuery } from "react-query";
import serviceHandler from "../../../services/service-handler";
import { ServiceType } from "../../../models/service";

import BasicCrudOperations from "../../../core/components/BasicCrudOperations";
import { ENV } from "../../../consts/const";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";
import { useNavigate } from "react-router";
import ROUTES from "../../../consts/routes";

const GlobalServices = () => {
  const { data: servicesData, refetch: refecthServices } = useQuery({
    queryFn: () => serviceHandler.findAll({}).then((res) => res.data),
    queryKey: ["services"],
  });

  const navigate = useNavigate();

  return (
    <div style={{ marginTop: "100px" }}>
      <BasicCrudOperations
        identifier="id"
        patchIdentifierName="serviceId"
        createApi={`${ENV.BACKEND_ROUTE}/services`}
        patchApi={`${ENV.BACKEND_ROUTE}/services`}
        deleteByIdApi={`${ENV.BACKEND_ROUTE}/services`}
        onAfterSuccessQuery={() => {
          refecthServices();
        }}
        keyWord="title"
        elements={servicesData?.services || []}
        scheme={{
          title: {
            title: true,
            inputText: true,
            label: "Título",
            required: true,
          },
          type: {
            select: true,
            tag: true,
            label: "Tipo",
            options: [
              { value: ServiceType.normal, label: "Normal" },
              { value: ServiceType.plans, label: "Planes" },
            ],
            required: true,
          },
        }}
        notIncludeKeysInEdition={["id", "contractId"]}
        notIncludeKeys={["id", "contractId"]}
        body={(service) => (
          <div style={{ marginTop: "20px" }}>
            <Button
              label="Opciones"
              icon={PrimeIcons.EYE}
              onClick={() => {
                navigate(
                  ROUTES.DASHBOARD.GLOBAL_SERVICE_OPTIONS_ID(
                    service?.id as number
                  )
                );
              }}
            />
          </div>
        )}
        showCreationButton={true}
      />
    </div>
  );
};

export default GlobalServices;
