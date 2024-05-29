import { FileUpload } from "primereact/fileupload";
import { ENV } from "../../consts/const";
import { Button } from "primereact/button";

const Documents = () => {
  return (
    <div>
      <h2>Cédula</h2>
      <FileUpload
        multiple={true}
        name="userCard"
        withCredentials={true}
        uploadLabel="Subir"
        chooseLabel="Elegir imágenes"
        cancelLabel="Cancelar"
        url={`${ENV.BACKEND_ROUTE}/multimedia/user-card`}
      />
      <h2>Video</h2>
      <small>Debes decir lo siguiente en el video</small>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
        dolor sequsantium incidunt quibusdam sed quod, non delectus hic unde!
      </p>
      <FileUpload
        uploadLabel="Subir"
        chooseLabel="Elegir video"
        cancelLabel="Cancelar"
        multiple={true}
        name="video"
        withCredentials={true}
        url={`${ENV.BACKEND_ROUTE}/multimedia/video`}
      />
      <Button label="Enviar formulario" />
    </div>
  );
};

export default Documents;
