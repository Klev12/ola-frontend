const formatDate = (
  date: string,
  format: "complete" | "simplified" = "complete"
) => {
  let properties: Intl.DateTimeFormatOptions = {};
  if (format === "complete") {
    properties = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
  }

  return new Date(date).toLocaleString("en-US", properties);
};

export default formatDate;
