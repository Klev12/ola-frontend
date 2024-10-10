import { useQuery } from "react-query";
import courseService from "../../../services/course-service";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { CourseGetDto } from "../../../models/course";

interface SelectCourseListProps {
  onSelect?: (course?: CourseGetDto) => void;
}

const SelectCourseList = ({ onSelect }: SelectCourseListProps) => {
  const [selectedCourseId, setSelectedCourseId] = useState<number>(0);
  const { data: coursesData } = useQuery({
    queryFn: () => courseService.findAll({ limit: 20 }).then((res) => res.data),
    queryKey: ["courses"],
  });

  return (
    <div>
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
    </div>
  );
};

export default SelectCourseList;
