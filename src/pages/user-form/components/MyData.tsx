import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useQuery } from "react-query";
import { authenticate } from "../../../services/user-service";

const MyData = () => {
  const { data: userData } = useQuery({
    queryFn: () => authenticate().then((res) => res.data.user),
    queryKey: ["user"],
  });

  return (
    <Card>
      Mis datos
      <Divider />
      <FloatLabel>
        <label htmlFor="Ifulname">Nombres Y Apellidos</label>
        <InputText
          id={"Ifullname"}
          disabled
          defaultValue={userData?.fullname}
        />
      </FloatLabel>
    </Card>
  );
};

export default MyData;
