import { Divider } from "primereact/divider";
import { TrainingGetDto } from "../../../models/training";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";
import useGlobalState from "../../../store/store";
import { Roles } from "../../../models/user";

interface TrainingCardProps {
  training: TrainingGetDto;
  onClickButton: (training: TrainingGetDto) => void;
  onDelete?: (training: TrainingGetDto) => void;
  onEdit?: (training: TrainingGetDto) => void;
}

const TrainingCard = ({
  training,
  onClickButton,
  onDelete,
  onEdit,
}: TrainingCardProps) => {
  const authenticatedUser = useGlobalState((state) => state.user);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "end" }}>
        {authenticatedUser?.role === Roles.admin && (
          <Button
            rounded
            icon={PrimeIcons.TIMES}
            onClick={() => {
              if (onDelete) onDelete(training);
            }}
          />
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <h2>{training.title}</h2>
        {authenticatedUser?.role === Roles.admin && (
          <Button
            outlined
            rounded
            icon={PrimeIcons.PENCIL}
            onClick={() => {
              if (onEdit) onEdit(training);
            }}
          />
        )}
      </div>
      <Button
        label="Ver video"
        icon={PrimeIcons.EYE}
        onClick={() => onClickButton(training)}
      />
      <Divider />
    </div>
  );
};

export default TrainingCard;
