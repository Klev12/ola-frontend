import { createContext, RefObject, useRef, useState } from "react";
import { SaleCommercialCost, SalePaymentMethod } from "../../../../models/sale";

import { Stepper, StepperRefAttributes } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import SelectContractType from "./SelectContractType";
import { ContractGetDto } from "../../../../models/contract";
import { CourseGetDto } from "../../../../models/course";
import { ServiceGetDto, ServiceOptionGetDto } from "../../../../models/service";
import OptionsBasedInContract from "./OptionsBasedInContract";
import SalePaymentData from "./SalePaymentData";
import CreateSaleAndProof from "./CreateSaleAndProof";

interface CreateSaleMenuProps {
  onSuccessCreated?: () => void;
}

interface SaleData {
  contract?: ContractGetDto;
  totalToPay: number;
  discount: number;
  amount: number;
  observations?: string;
  course?: CourseGetDto;
  service?: ServiceGetDto;
  serviceOption?: ServiceOptionGetDto;
  commercialCost: SaleCommercialCost;
  paymentMethod: SalePaymentMethod;
}

interface SaleMenuContextProps {
  sale?: Partial<SaleData>;
  setSale: (sale?: Partial<SaleData>) => void;
  stepper?: RefObject<StepperRefAttributes>;
  onQuerySuccess?: () => void;
}

export const SaleMenuContext = createContext<SaleMenuContextProps>({
  setSale: () => {},
  onQuerySuccess: () => {},
});

const CreateSaleMenu = ({ onSuccessCreated }: CreateSaleMenuProps) => {
  const stepper = useRef<StepperRefAttributes>(null);

  const [sale, setSale] = useState<Partial<SaleData>>();

  return (
    <SaleMenuContext.Provider
      value={{
        sale,
        setSale: (sale) => {
          setSale(sale);
        },
        stepper,
        onQuerySuccess: onSuccessCreated,
      }}
    >
      <Stepper ref={stepper} linear>
        <StepperPanel header="Tipo">
          <SelectContractType />
        </StepperPanel>
        <StepperPanel header="Opciones">
          <OptionsBasedInContract />
        </StepperPanel>
        <StepperPanel header="Datos">
          <SalePaymentData />
        </StepperPanel>
        <StepperPanel header="Finalizar">
          <CreateSaleAndProof />
        </StepperPanel>
      </Stepper>
    </SaleMenuContext.Provider>
  );
};

export default CreateSaleMenu;
