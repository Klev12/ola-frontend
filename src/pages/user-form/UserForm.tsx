import { useQuery } from "react-query";
import { getFormSchemeById } from "../../services/form-scheme";
import { useEffect, useState } from "react";
import { FormScheme } from "../../models/form-scheme";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import FieldList from "./components/FieldList";

const UserForm = () => {
  const { data: formSchemeData } = useQuery({
    queryFn: () => getFormSchemeById(2),
  });

  const [formScheme, setFormScheme] = useState<FormScheme | undefined>();
  useEffect(() => {
    setFormScheme(formSchemeData?.data.form_scheme);
  }, [formSchemeData]);

  return (
    <div>
      <h2>{formScheme?.label}</h2>
      {formScheme?.form_groups.map((formGroup) => {
        return (
          <Card key={formGroup.id}>
            {formGroup.label}
            <Divider />
            <FieldList fields={formGroup.fields} />
          </Card>
        );
      })}
    </div>
  );
};

export default UserForm;
