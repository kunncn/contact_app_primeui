import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { RedirectFunction } from "../function";
import { useToastHook } from "../../hook";
import ToastComponent from "./Toast.component";

type Props = {
  address: null | string;
  created_at: string;
  email: null | string;
  id: number;
  name: string;
  phone: string;
  photo: null | string;
  updated_at: string;
  user_id: string;
};

const ContactComponent = ({ contactLists }: { contactLists: Props[] }) => {
  const { successToast, successToastHandler } = useToastHook();
  const nav = useNavigate();
  useToastHook();

  const handleEdit = (id: number) => {};

  const handleDelete = (id: number) => {};

  const logoutHandler = () => {
    localStorage.setItem("logout", true.toString());
    localStorage.removeItem("auth");
    successToastHandler({ message: "Logged out successfully" });
    setTimeout(() => {
      nav("/login");
    }, 2000);
  };

  const renderActions = (id: number) => {
    return (
      <div className="flex gap-1 justify-end pe-7">
        <Button
          type="button"
          className="p-2 rounded btn w-fit mt-0"
          onClick={() => handleEdit(id)}
        >
          <i className="pi pi-pencil text-white text-xl"></i>
        </Button>
        <Button
          type="button"
          className="p-2 rounded btn w-fit mt-0"
          onClick={() => handleDelete(id)}
        >
          <i className="pi pi-trash text-white text-xl"></i>
        </Button>
      </div>
    );
  };

  const keysToRender = ["name", "phone", "email", "address"];
  const reversedContactLists = contactLists.slice().reverse();

  return (
    <RedirectFunction
      to="/login"
      check={
        localStorage.getItem("auth") &&
        localStorage.getItem("logout") === "true"
      }
    >
      <div className="card mt-8 mx-3 md:mx-0">
        <ToastComponent toast={successToast} />
        <DataTable
          className="border border-gray-300"
          value={reversedContactLists}
          paginator
          rows={4}
          rowsPerPageOptions={[4, 8, 12, 16]}
        >
          {keysToRender.map((key, index) => (
            <Column
              key={index}
              field={key}
              header={key.charAt(0).toUpperCase() + key.slice(1)}
              style={{ minWidth: "200px" }}
              body={(rowData: Props) => {
                if (
                  (key === "email" && !rowData.email) ||
                  (key === "address" && !rowData.address)
                ) {
                  return <i className="pi pi-cloud-upload"></i>;
                } else {
                  return rowData[key];
                }
              }}
            />
          ))}
          <Column
            headerStyle={{
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: "45px",
            }}
            body={(rowData: Props) => renderActions(rowData.id)}
            header="Action"
          />
        </DataTable>
        <Button onClick={logoutHandler} className="btn w-fit ms-auto">
          LogOut
        </Button>
      </div>
    </RedirectFunction>
  );
};

export default ContactComponent;
