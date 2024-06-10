import { Calendar } from "primereact/calendar";
import { Field } from "../../../models/form-scheme";
import { useState } from "react";
import { Nullable } from "primereact/ts-helpers";

interface CalendarFieldProps {
  field: Field;
}

const CalendarField = ({ field }: CalendarFieldProps) => {
  const [date, setDate] = useState<Nullable<Date>>(() => {
    return new Date();
  });

  return (
    <>
      <label htmlFor="">{field.label}</label>
      <Calendar
        required={field.required}
        value={date}
        name={field.id as string}
        onChange={(e) => setDate(e.value)}
      />
    </>
  );
};

export default CalendarField;
