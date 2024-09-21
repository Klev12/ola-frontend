import { Dropdown } from "primereact/dropdown";
import { UserArea } from "../models/user";
import { useState } from "react";

interface SelectUserAreaProps {
  defaultArea?: UserArea;
}

const SelectUserArea = ({ defaultArea }: SelectUserAreaProps) => {
  const [selectedArea, setSelecteArea] = useState<UserArea | undefined>(
    defaultArea
  );

  return (
    <Dropdown
      value={selectedArea}
      id="area"
      name="area"
      options={Object.values(UserArea).map((area) => {
        switch (area) {
          case UserArea.administration:
            return {
              value: area,
              label: "Administración",
            };
          case UserArea.commercial:
            return {
              value: area,
              label: "Asesor comercial",
            };

          case UserArea.communication:
            return {
              value: area,
              label: "Comunicación",
            };
          case UserArea.design:
            return {
              value: area,
              label: "Diseño",
            };
          case UserArea.marketing:
            return {
              value: area,
              label: "Marketing",
            };
          case UserArea.audiovisualProduction:
            return {
              value: area,
              label: "Producción audiovisual",
            };
        }
      })}
      optionLabel="label"
      onChange={(e) => setSelecteArea(e.value)}
      placeholder="Selecciona una área"
      className="w-full md:w-14rem"
    />
  );
};

export default SelectUserArea;
