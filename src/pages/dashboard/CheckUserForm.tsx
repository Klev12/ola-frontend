import { useMutation, useQuery } from "react-query";
import { getFormById, getUserFormByUserId } from "../../services/forms-service";
import { useParams } from "react-router";
import { submitForm } from "../../services/result-service";
import { findUserById, verifyUserForm } from "../../services/user-service";
import { ENV } from "../../consts/const";
import { MultimediaType } from "../../models/user";
import "./styles/check-user-form-styles.css";
import { useMemo, useRef, useState } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import GlobalPrintForm from "../../components/global-print-form/GlobalPrintForm";
import { Button } from "primereact/button";
import { AxiosError } from "axios";
import FileUploader from "../../components/FileUploader";
import { FileDocument } from "../../models/file";

interface CheckUserFormProps {
  normalMode?: boolean;
}

const CheckUserForm = ({ normalMode = false }: CheckUserFormProps) => {
  const { id } = useParams();
  const toast = useRef<Toast>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const { mutate: findUserByIdMutate, data: userData } =
    useMutation(findUserById);

  const { data: formData, isLoading: isFormLoading } = useQuery({
    queryFn: () =>
      normalMode
        ? getFormById(id as string).then((res) => res.data)
        : getUserFormByUserId(id as string).then((res) => res.data),
    queryKey: ["form-user", id],
    retry: 1,
    onSuccess: (data) => {
      if (!normalMode) findUserByIdMutate(data.user_form.user_id);
    },
    onError: () => {
      setErrorMessage("Formulario no encontrado");
    },
    refetchOnWindowFocus: false,
  });

  const { mutate: verifyUserFormMutate, isLoading: isVerifyingUserForm } =
    useMutation(verifyUserForm, {
      onSuccess: () => {
        findUserByIdMutate(formData?.user_form?.user_id as number);
      },
      onError: (error: AxiosError<{ error?: { message?: string } }>) => {
        const message = error.response?.data?.error?.message;
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: message,
        });
      },
    });

  const { mutate: submitFormMutate, isLoading } = useMutation(submitForm, {
    onSuccess: () => {
      toast.current?.show({
        severity: "success",
        summary: "Éxito al subir cambios",
      });
    },
    onError: (error: AxiosError<{ error?: { message?: string } }>) => {
      const message = error?.response?.data?.error?.message;

      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: message,
      });
    },
  });

  const cardImages: FileDocument[] = useMemo(() => {
    return (
      userData?.data.user.multimedias
        .filter((file) => file.type === "card_id")
        .map(
          (file) =>
            ({
              id: file.id,
              identifier: file.hash,
              status: "completado",
              url: `${ENV.BACKEND_ROUTE}/multimedia/${file.hash}`,
            } as FileDocument)
        ) || []
    );
  }, [userData]);

  const videos = useMemo(() => {
    return (
      userData?.data.user.multimedias.filter((file) => file.type === "video") ||
      []
    ).map(
      (video) =>
        ({
          id: video.id,
          identifier: video.hash,
          status: "completado",
          url: `${ENV.BACKEND_ROUTE}/multimedia/${video.hash}`,
        } as FileDocument)
    );
  }, [userData]);

  const signature = useMemo(() => {
    return (
      userData?.data.user.multimedias.filter(
        (file) => file.type === "signature"
      ) || []
    ).map(
      (signature) =>
        ({
          id: signature.id,
          identifier: signature.hash,
          status: "completado",
          url: `${ENV.BACKEND_ROUTE}/multimedia/${signature.hash}`,
        } as FileDocument)
    );
  }, [userData]);

  return (
    <div className="user-form" style={{ position: "relative" }}>
      <Toast ref={toast} />
      {isFormLoading && <ProgressSpinner />}
      {errorMessage && <h2>{errorMessage}</h2>}
      <GlobalPrintForm
        showHeader={true}
        formInfo={formData?.user_form}
        formScheme={formData?.form_scheme}
        defaulEditionMode={false}
        onSubmit={(results) => {
          submitFormMutate({ id: formData?.user_form?.id as number, results });
        }}
        loading={isLoading}
        customHeaderTemplate={({
          goBackButton,
          editionMenu,
          pdfButton,
          submitButton,
          verificationButton,
        }) => {
          return (
            <>
              {goBackButton}
              {editionMenu}
              <Button
                type="button"
                label={
                  userData?.data?.user?.is_form_verified
                    ? "Usuario verificado"
                    : "Verificar usuario"
                }
                disabled={userData?.data?.user?.is_form_verified}
                onClick={() => {
                  verifyUserFormMutate(formData?.user_form.user_id as number);
                }}
                loading={isVerifyingUserForm}
              />
              {verificationButton}
              {submitButton}
              {pdfButton}
            </>
          );
        }}
      />
      <div style={{ padding: "20px" }}>
        <h2>Imágenes de identificación</h2>
        <FileUploader
          type="image"
          uploadUrl={`${ENV.BACKEND_ROUTE}/multimedia/user-card/${userData?.data.user.id}`}
          deleteUrl={`${ENV.BACKEND_ROUTE}/multimedia/`}
          defaultFiles={cardImages}
          maxFiles={2}
          name="userCard"
          accept=".png, .jpeg, .jpg"
          showSpecificDelete={false}
          onAfterUpload={() => {
            findUserByIdMutate(formData?.user_form?.user_id as number);
          }}
          onAfterGlobalDelete={() => {
            findUserByIdMutate(formData?.user_form?.user_id as number);
          }}
        />
        <h2>Video</h2>
        <FileUploader
          uploadUrl={`${ENV.BACKEND_ROUTE}/multimedia/video/${userData?.data.user.id}`}
          deleteUrl={`${ENV.BACKEND_ROUTE}/multimedia/`}
          type="video"
          maxFiles={1}
          name="video"
          defaultFiles={videos}
          showSpecificDelete={false}
          onAfterUpload={() => {
            findUserByIdMutate(formData?.user_form?.user_id as number);
          }}
          accept=".mp4, .wav"
          onAfterGlobalDelete={() => {
            findUserByIdMutate(formData?.user_form?.user_id as number);
          }}
        />
        <h2>Firma</h2>
        <FileUploader
          uploadUrl={`${ENV.BACKEND_ROUTE}/multimedia/signature/${userData?.data.user.id}`}
          deleteUrl={`${ENV.BACKEND_ROUTE}/multimedia/`}
          type="canvas-draw"
          maxFiles={1}
          name="signature"
          defaultFiles={signature}
          showSpecificDelete={false}
          onAfterUpload={() => {
            findUserByIdMutate(formData?.user_form?.user_id as number);
          }}
          onAfterGlobalDelete={() => {
            findUserByIdMutate(formData?.user_form?.user_id as number);
          }}
        />

        <div className="images">
          {userData?.data.user.multimedias.map((file) => {
            if (file.type === MultimediaType.video) {
              return (
                <video
                  key={file.id}
                  src={`${ENV.BACKEND_ROUTE}/multimedia/${file.hash}`}
                  width={300}
                  controls={true}
                ></video>
              );
            }

            return (
              <img
                key={file.id}
                src={`${ENV.BACKEND_ROUTE}/multimedia/${file.hash}`}
                alt={file.name}
                width={200}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CheckUserForm;
