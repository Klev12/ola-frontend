import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import copyText from "../../utils/copy-text";
import { useRef } from "react";
import { Toast } from "primereact/toast";

interface CopyButtonProps {
  text?: string;
  message?: string;
}

const CopyButton = ({ text, message }: CopyButtonProps) => {
  const toast = useRef<Toast>(null);

  return (
    <div>
      <Toast ref={toast} />
      <Button
        icon={PrimeIcons.COPY}
        onClick={() => {
          copyText(text || "");
          toast.current?.show({
            severity: "success",
            summary: message || "texto copiado!",
          });
        }}
      />
    </div>
  );
};

export default CopyButton;
