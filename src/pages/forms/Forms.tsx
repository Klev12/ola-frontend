import { useQuery } from "react-query";
import { getAllForms, getMyForms } from "../../services/forms-service";
import { Card } from "primereact/card";
import useGlobalState from "../../store/store";
import { Roles } from "../../models/user";

const Forms = () => {
  const user = useGlobalState((state) => state.user);
  const { data: formData } = useQuery({
    queryFn: () =>
      user?.role === Roles.user
        ? getMyForms().then((res) => res.data)
        : getAllForms().then((res) => res.data),
  });

  return (
    <div>
      {formData?.forms.map((form) => {
        return (
          <Card key={form.id}>
            <div>{form.id}</div>
            <div>{form.label}</div>
          </Card>
        );
      })}
    </div>
  );
};

export default Forms;
