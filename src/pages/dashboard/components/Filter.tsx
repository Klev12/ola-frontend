import { Dropdown } from "primereact/dropdown";
import SearchInput from "../../../components/SearchInput";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";
import { Dialog } from "primereact/dialog";
import useToggle from "../../../hooks/useToggle";
import { Calendar } from "primereact/calendar";
import { SelectButton } from "primereact/selectbutton";
import { Checkbox } from "primereact/checkbox";

const Filter = () => {
  const showFilters = useToggle();

  return (
    <div>
      <h3>Filtrar por</h3>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <div style={{ width: "200px" }}>
          {" "}
          <SearchInput />
        </div>
        <Dropdown placeholder="Estatus de formulario" />
        <Dropdown placeholder="Estatus de pago" />
        <Dropdown placeholder="Propiedad" />
        <Button
          icon={PrimeIcons.MINUS_CIRCLE}
          label="Más filtros"
          onClick={() => showFilters.setTrue()}
        />
      </div>
      <Dialog
        draggable={false}
        header="Más filtros"
        visible={showFilters.value}
        onHide={() => showFilters.setFalse()}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Calendar placeholder="Mes y año" />

          <SelectButton
            options={[{ label: "Usuarios" }, { label: "Grupos" }]}
          />
          <Checkbox checked={false} />
          <Button label="Aplicar filtros" />
        </div>
      </Dialog>
    </div>
  );
};

export default Filter;
