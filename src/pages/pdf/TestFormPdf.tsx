import { useParams } from "react-router";
import { getTestById } from "../../services/test-service";
import FormPdf from "./components/FormPdf";
import { useQuery } from "react-query";
import gradeService from "../../services/grade-service";
import { useMemo } from "react";
import { TestGetDto } from "../../models/test";
import { GradeGetDto } from "../../models/grade";

const TestFormPdf = () => {
  const { id } = useParams();

  const { data: testData, isLoading } = useQuery({
    queryFn: () => getTestById({ id: Number(id) }).then((res) => res.data),
    queryKey: ["user-form-by-user-id", id],
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const { data: gradeData } = useQuery({
    queryFn: () =>
      gradeService.findAll({ testId: Number(id) }).then((res) => res.data),
  });

  const test = useMemo(() => {
    const grade = gradeData?.grades?.find(
      (grade) => grade.testId === testData?.test.id
    );
    return { ...testData?.test, grade } as TestGetDto & { grade?: GradeGetDto };
  }, [testData, gradeData]);

  return (
    <>
      {testData && (
        <FormPdf
          type="test-form"
          test={test}
          formScheme={testData?.formScheme}
        />
      )}
      {!testData && !isLoading && <div>formulario no encontrado</div>}
    </>
  );
};

export default TestFormPdf;
