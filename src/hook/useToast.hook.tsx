import { Toast } from "primereact/toast";
import { useRef } from "react";

const useToastHook = () => {
  const errorToast = useRef<Toast>(null);
  const successToast = useRef<Toast>(null);

  const successToastHandler = ({
    message,
  }: {
    message: string | undefined;
  }) => {
    successToast.current?.show({
      life: 1500,
      severity: "success",
      summary: "Success",
      detail: message || "Register Successfully",
    });
  };

  const errorToastHandler = ({ message }: { message: string }) => {
    errorToast.current?.show({
      life: 4500,
      severity: "error",
      summary: "Rejected",
      detail: message || "Something went wrong",
    });
  };

  return { successToastHandler, errorToastHandler, successToast, errorToast };
};

export default useToastHook;
