interface GenerateQueryArrayProps {
  name: string;
  values: string[];
}

const generateQueryArray = ({ name, values }: GenerateQueryArrayProps) => {
  const query: string[] = [];

  for (const value of values) {
    query.push(`${name}[]=${value}`);
  }

  return query.join("&");
};

export default generateQueryArray;
