import { useQuery } from "react-query";
import courseService from "../../../services/course-service";
import { useContext, useMemo } from "react";

import { SalesFormContext } from "./WrapperSalesForm";

const SelectCourse = () => {
  const { formInfo, hash } = useContext(SalesFormContext);

  const { data: coursesData } = useQuery({
    queryFn: () =>
      courseService.findAll({ limit: 20, hash }).then((res) => res.data),
    queryKey: ["courses"],
  });

  const currentCourse = useMemo(() => {
    return coursesData?.courses.find(
      (course) => course.id === formInfo?.form_course.courseId
    );
  }, [coursesData, formInfo]);

  return (
    <div>
      <h2>Tipo de capacitación</h2>
      <div>
        <h2>{currentCourse?.title}</h2>
        <p>{currentCourse?.description}</p>
      </div>
    </div>
  );
};

export default SelectCourse;
