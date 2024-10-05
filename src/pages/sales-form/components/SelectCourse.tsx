import { useMutation, useQuery } from "react-query";
import courseService from "../../../services/course-service";
import { useContext, useEffect, useState } from "react";
import { CourseGetDto } from "../../../models/course";
import { Checkbox } from "primereact/checkbox";
import { ScrollPanel } from "primereact/scrollpanel";
import formCourseService from "../../../services/form-course-service";
import { SalesFormContext } from "./WrapperSalesForm";

const SelectCourse = () => {
  const { formInfo, hash } = useContext(SalesFormContext);

  const { data: coursesData } = useQuery({
    queryFn: () =>
      courseService.findAll({ limit: 20, hash }).then((res) => res.data),
    queryKey: ["courses"],
  });

  const [selectedCourse, setSelectedCourse] = useState<CourseGetDto>();

  const { mutate: setCourse } = useMutation(formCourseService.setCourse);

  useEffect(() => {
    setSelectedCourse({
      id: formInfo?.form_course?.courseId as number,
    } as CourseGetDto);
  }, [formInfo]);

  return (
    <div>
      <h2>Tipo de capacitación</h2>
      {coursesData?.courses.map((course) => {
        return (
          <div key={course.id} style={{ margin: "20px 0" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                marginTop: "10px",
              }}
            >
              <div style={{ fontWeight: "bold" }}>{course.title}</div>
              <Checkbox
                disabled={formInfo?.done}
                required={!selectedCourse}
                checked={selectedCourse?.id === course.id}
                onClick={() => {
                  setSelectedCourse(course);
                  setCourse({
                    courseId: course.id,
                    formId: formInfo?.id as number,
                    hash,
                  });
                }}
              />
            </div>
            <div
              style={{
                marginLeft: "10px",
              }}
            >
              <ScrollPanel style={{ height: "100px", margin: "20px 0" }}>
                <div
                  style={{}}
                  dangerouslySetInnerHTML={{ __html: course.html }}
                ></div>
              </ScrollPanel>

              <div>Precio: {course.price}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SelectCourse;
