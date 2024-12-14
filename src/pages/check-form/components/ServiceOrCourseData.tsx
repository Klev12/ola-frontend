import { Card } from "primereact/card";
import { ContractIds } from "../../../consts/const";
import { SaleGetDto } from "../../../models/sale";
import { ServiceType } from "../../../models/service";

interface ServiceOrCourseDataProps {
  form?: SaleGetDto;
}

const ServiceOrCourseData = ({ form }: ServiceOrCourseDataProps) => {
  return (
    <Card
      title={
        form?.contractId === ContractIds.projectHub
          ? "Capacitación"
          : "Servicio"
      }
    >
      {form?.contractId === ContractIds.projectHub && (
        <>
          <div>{form.courseTitle}</div>
        </>
      )}
      {form?.contractId === ContractIds.projectPolitics && (
        <>
          <div>{form.serviceTitle}</div>
          <h3>
            {form.serviceType === ServiceType.plans ? "Plan" : "Subservicio"}
          </h3>
          <div>{form.serviceOptionTitle}</div>
        </>
      )}
    </Card>
  );
};

export default ServiceOrCourseData;
