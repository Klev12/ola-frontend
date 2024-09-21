import { TestStatus, TestToResolveGetDto } from "../../../models/test";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";
import ROUTES from "../../../consts/routes";
import { useNavigate } from "react-router";
import { ReactNode, useMemo } from "react";
import { GradeStatus } from "../../../models/grade";
import { Tag } from "primereact/tag";
import formatDate from "../../../utils/format-date";
import Timer from "../../../components/Timer";
import useToggle from "../../../hooks/useToggle";
import useGlobalState from "../../../store/store";

interface NormalModeCardProps {
  test?: TestToResolveGetDto;
  children?: ReactNode;
}

const NormalModeCard = ({ test, children }: NormalModeCardProps) => {
  const navigate = useNavigate();
  const canSubmit = useToggle(true);
  const authenticatedUser = useGlobalState((state) => state.user);

  const grade = useMemo(() => {
    return test?.grades.find((grade) => grade.userId === authenticatedUser?.id);
  }, [test, authenticatedUser]);

  return (
    <div>
      <div style={{ display: "grid", gap: "20px" }}>
        {test?.published && (
          <div style={{ display: "grid", gap: "20px" }}>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: "20px" }}>
                <span style={{ fontWeight: "bold" }}>Empieza en:</span>
                <span>
                  {formatDate(test.startDate as string, "simplified")}
                </span>
              </div>
              <div style={{ display: "flex", gap: "20px" }}>
                <span style={{ fontWeight: "bold" }}>Acaba en:</span>
                <span>{formatDate(test.endDate, "simplified")}</span>
              </div>
            </div>
          </div>
        )}
        {grade?.expireTime && grade?.status !== GradeStatus.resolved && (
          <Timer
            expiryTimestamp={new Date(grade?.expireTime)}
            onExpireFn={() => {
              canSubmit.setFalse();
            }}
          />
        )}
        <div style={{ display: "flex", gap: "20px" }}>
          <Tag
            style={{ width: "fit-content" }}
            severity={
              grade?.status === GradeStatus.resolved ? "success" : "info"
            }
            value={
              grade?.status === GradeStatus.resolved
                ? "prueba resuelta"
                : "prueba no resuelta"
            }
          />
          <Tag
            severity={test?.status !== TestStatus.active ? "danger" : "success"}
            value={test?.status}
          />
        </div>
        {grade?.userCode && (
          <div>
            <span>Prueba resuelta por:</span>
            {` ${grade?.userName.toUpperCase()}`}
          </div>
        )}
      </div>
      <h2>{test?.title}</h2>
      <Button
        label="Resolver"
        disabled={
          test?.status !== TestStatus.active ||
          grade?.status === GradeStatus.resolved ||
          !canSubmit.value
        }
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
