import { Toast } from "primereact/toast";
import { RefObject } from "react";

type Props = {
  toast: RefObject<Toast> | null;
};

const ToastComponent = ({ toast }: Props) => {
  return <Toast className="capitalize" ref={toast} position="top-center" />;
};

export default ToastComponent;
