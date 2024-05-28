import { Calendar } from "primereact/calendar";
import { Field } from "../../../models/form-scheme";
import { useState } from "react";

interface CalendarFieldProps {
  field: Field;
}

const CalendarField = ({ field }: CalendarFieldProps) => {
  const [date, setDate] = useState(null);

  return (
    <>
      <label htmlFor="">{field.label}</label>
      <Calendar
        required
        value={date}
        name={field.id as string}
        onChange={(e) => setDate(e.value as null)}
      />
    </>
  );
};

export default CalendarField;
