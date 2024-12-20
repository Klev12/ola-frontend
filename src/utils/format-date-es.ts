const formatDateEs = (date: string) => {
  const currentDate = new Date(date);

  return currentDate
    .toLocaleDateString("es-Es", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
    .replace("de", "del mes de");
};

export default formatDateEs;
