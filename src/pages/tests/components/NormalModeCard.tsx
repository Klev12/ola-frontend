import Timer from "../../../components/Timer";
import useToggle from "../../../hooks/useToggle";
import { TestGetDto } from "../../../models/test";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";
import ROUTES from "../../../consts/routes";
import { useNavigate } from "react-router";
import { ReactNode } from "react";
import { GradeGetDto } from "../../../models/grade";
import { Tag } from "primereact/tag";

interface NormalModeCardProps {
  test?: TestGetDto & { grade?: GradeGetDto };
  children?: ReactNode;
}

const NormalModeCard = ({ test, children }: NormalModeCardProps) => {
  const canSubmit = useToggle(true);

  const navigate = useNavigate();

  return (
    <div>
      {test?.published && (
        <>
          <Timer
            expiryTimestamp={new Date(test.expireTime || "")}
            onExpireFn={() => {
              canSubmit.setFalse();
            }}
          />
          {!canSubmit.value && (
            <Tag severity={"danger"} value="Tiempo agotado" />
          )}
        </>
      )}
      {
        <Tag
          severity={test?.grade ? "success" : "info"}
          value={test?.grade ? "prueba resuelta" : "prueba no resuelta"}
        />
      }
      <h2>{test?.title}</h2>
      <Button
        label="Resolver"
        disabled={!canSubmit.value || !!test?.grade}
        icon={PrimeIcons.EYE}
        onClick={() => {
          navigate(ROUTES.TESTS.RESOLVER_TEST_ID(test?.id as number));
        }}
      />
      {children}
    </div>
  );
};

export default NormalModeCard;
