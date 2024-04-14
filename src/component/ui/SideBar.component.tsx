import { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";

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
        <h2>Sidebar</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </Sidebar>
      <Button className="btn w-fit ms-auto" onClick={() => setVisible(true)}>
        Create Contact
      </Button>
    </div>
  );
};
export default SidebarComponent;
