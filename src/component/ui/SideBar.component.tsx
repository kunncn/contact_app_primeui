import { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import FormComponent from "./Form.component";

const SidebarComponent = () => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className="card flex justify-content-center px-3 md:px-0">
      <Sidebar
        visible={visible}
        position="right"
        className=" w-[300px] md:w-[400px]"
        onHide={() => setVisible(false)}
      >
        <h2 className="font-bold">Contact Infomation</h2>
        <FormComponent setVisible={setVisible} />
      </Sidebar>
      <Button className="btn w-fit ms-auto" onClick={() => setVisible(true)}>
        Create Contact
      </Button>
    </div>
  );
};
export default SidebarComponent;
