import { useMutation, useQuery } from "react-query";
import GlobalPrintForm from "../../components/global-print-form/GlobalPrintForm";
import { useNavigate, useParams } from "react-router";
import { getTestById } from "../../services/test-service";
import gradeService from "../../services/grade-service";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import GoBackButton from "../../components/GoBackButton";
import Timer from "../../components/Timer";
import ROUTES from "../../consts/routes";

const Resolver = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data: testData } = useQuery({
    queryFn: () => getTestById({ id: Number(id) }).then((res) => res.data),
  });

  const { mutate: submitGrade } = useMutation(gradeService.submit, {
    onSuccess: () => {
      navigate(ROUTES.TESTS.ME);
    },
  });

  return (
    <div>
      <GlobalPrintForm
        showHeader={true}
        customHeaderTemplate={() => (
          <>
            <GoBackButton />
            {testData?.test && (
              <Timer
                expiryTimestamp={new Date(testData.test.expireTime || "")}
                onExpireFn={() => {
                  navigate(ROUTES.TESTS.ME);
                }}
              />
            )}
          </>
        )}
        formScheme={testData?.formScheme}
        onSubmit={(data) => {
          confirmDialog({
            acceptLabel: "Sí",
            header: "Confirmación",
            message:
              "¿Estás seguro de subir los datos de la prueba (los datos de la prueba no podrán ser modificados después)?",
            accept: () => {
              submitGrade({
                testId: testData?.test.id as number,
                results: data.map((field) => {
                  return field.response.value;
                }),
              });
            },
          });
        }}
      />
      <ConfirmDialog draggable={false} style={{ width: "70vw" }} />
    </div>
  );
};

export default Resolver;
