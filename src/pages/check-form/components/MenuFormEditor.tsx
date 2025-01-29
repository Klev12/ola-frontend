import { Card } from "primereact/card";
import { translatedCommercialCost } from "../../../consts/translations/sale-translations";
import MenuOption from "../../../core/components/menu-editor/components/MenuOption";
import MenuSelect from "../../../core/components/menu-editor/components/MenuSelect";
import MenuEditor from "../../../core/components/menu-editor/MenuEditor";
import { SaleCommercialCost, SaleGetDto } from "../../../models/sale";
import saleService from "../../../services/sale-service";

interface MenuFormEditorProps {
  formInfo?: SaleGetDto;
}

const MenuFormEditor = ({ formInfo }: MenuFormEditorProps) => {
  return (
    <Card title="Datos" style={{ minWidth: "250px", marginTop: "20px" }}>
      <MenuEditor globalPayload={{ saleId: formInfo?.saleId }}>
        <MenuSelect
          name="commercialCost"
          url={saleService.api.partialUpdate}
          label="Modalidad"
          defaultValue={formInfo?.commercialCost as string}
        >
          {Object.values(SaleCommercialCost).map((commercialCost, index) => (
            <MenuOption
              key={index}
              value={commercialCost}
              label={translatedCommercialCost[commercialCost]}
            />
          ))}
        </MenuSelect>
      </MenuEditor>
    </Card>
  );
};

export default MenuFormEditor;
