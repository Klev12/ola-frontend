import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

interface SearchInputProps {
  onSearch?: (keyword: string) => void;
  placeholder?: string;
}

const SearchInput = ({
  onSearch,
  placeholder = "Nombre",
}: SearchInputProps) => {
  return (
    <form
      className="p-inputgroup flex-1"
      style={{ width: "30vw" }}
      onSubmit={(e) => {
        e.preventDefault();
        const formData = Object.fromEntries(
          new FormData(e.target as HTMLFormElement)
        );
        if (onSearch) onSearch(formData["keyword"].toString());
      }}
    >
      <InputText placeholder={placeholder} name="keyword" />
      <Button icon="pi pi-search" />
    </form>
  );
};

export default SearchInput;
