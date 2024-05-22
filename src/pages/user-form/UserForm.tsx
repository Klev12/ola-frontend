import { useQuery } from "react-query";
import { getFormSchemeById } from "../../services/form-scheme";

const UserForm = () => {
  const { data: formSchemeData } = useQuery({
    queryFn: () => getFormSchemeById(2),
  });

  return (
    <div>
      <h2>{formSchemeData?.data.form_scheme.label}</h2>
      {formSchemeData?.data.form_scheme.form_groups.map((formGroup) => {
        return <div key={formGroup.id}></div>;
      })}
    </div>
  );
};

export default UserForm;
