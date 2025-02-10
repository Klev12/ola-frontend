import { useQuery } from "react-query";
import courseService from "../../../../services/course-service";
import { useContext, useMemo, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { CourseGetDto } from "../../../../models/course";
import { SaleMenuContext } from "./CreateSaleMenu";
import { Button } from "primereact/button";
import { ScrollPanel } from "primereact/scrollpanel";

interface SelectCourseListProps {
  onSelect?: (course?: CourseGetDto) => void;
}

const SelectCourseList = ({ onSelect }: SelectCourseListProps) => {
  const { stepper, setSale, sale } = useContext(SaleMenuContext);

  const [selectedCourseId, setSelectedCourseId] = useState<number | undefined>(
    sale?.course?.id
  );

  const { data: coursesData } = useQuery({
    queryFn: () => courseService.findAll({ limit: 20 }).then((res) => res.data),
    queryKey: ["courses"],
    refetchOnWindowFocus: false,
  });

  const course = useMemo(() => {
    return coursesData?.courses.find(
      (course) => course.id === selectedCourseId
    );
  }, [selectedCourseId, coursesData]);

  return (
    <div>
      <h3 className="font-bold">Capacitaciones</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSale({ ...sale, course });
          stepper?.current?.nextCallback();
        }}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <Dropdown
          required
          value={selectedCourseId}
          options={coursesData?.courses.map((course) => ({
            label: course.title,
            value: course.id,
          }))}
          onChange={(e) => {
            setSelectedCourseId(e.value);
            if (onSelect)
              onSelect(
                coursesData?.courses.find((course) => course.id === e.value)
              );
          }}
        />
        <ScrollPanel style={{ width: "200px", height: "100px" }}>
          <small>{course?.description}</small>
        </ScrollPanel>
        <Button
          disabled={!selectedCourseId}
          style={{ width: "fit-content" }}
          label="Siguiente"
        />
      </form>
    </div>
  );
};

export default SelectCourseList;
