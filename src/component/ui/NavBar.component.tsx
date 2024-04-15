import { Button } from "primereact/button";
import { useToastHook } from "../../hook";
import { useNavigate } from "react-router-dom";
import ToastComponent from "./Toast.component";

const NavBarComponent = () => {
  const { successToast, successToastHandler } = useToastHook();
  const nav = useNavigate();
  const logoutHandler = () => {
    localStorage.setItem("logout", true.toString());
    localStorage.removeItem("auth");
    successToastHandler({ message: "Logged out successfully" });
    setTimeout(() => {
      nav("/login");
    }, 2000);
  };
  return (
    <div className="flex justify-between items-center  py-[20px]  border-b-2 border-b-gray-200 px-3 md:px-0">
      <ToastComponent toast={successToast} />
      <h1 className="font-bold font-sans text-2xl">Contact App</h1>
      <Button onClick={logoutHandler} className="btn w-fit m-0">
        LogOut
      </Button>
    </div>
  );
};

export default NavBarComponent;
