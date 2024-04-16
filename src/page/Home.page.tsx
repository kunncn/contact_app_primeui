import { useEffect, useState } from "react";
import { RedirectFunction } from "../component/function/index";
import { useNavigate } from "react-router-dom";
import {
  ContactComponent,
  ContainerComponent,
  NavBarComponent,
  NoContactListComponent,
  SideBarComponent,
} from "../component/ui";
import { useGetContactsQuery } from "../service/contact/endpoint/contact.endpoint";
import { BarLoader } from "react-spinners";

const HomePage = () => {
  const nav = useNavigate();
  const contactStatus = useGetContactsQuery();
  const contactLists = contactStatus?.data?.contacts?.data;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("logout") === "true") {
      nav("/login");
    } else {
      localStorage.setItem("logout", "false");
    }
  }, [nav]);
  return (
    <RedirectFunction
      to="/register"
      check={!localStorage.getItem("auth") && !localStorage.getItem("logout")}
    >
      <ContainerComponent className={["container", "mx-auto"]}>
        <NavBarComponent />
        {contactStatus.isLoading && (
          <BarLoader color="#3b82f6" width={"100%"} />
        )}
        {!contactStatus.isLoading && !contactStatus.isError && (
          <>
            <SideBarComponent
              setFormData={setFormData}
              visible={visible}
              setVisible={setVisible}
              formData={formData}
            />
            {contactLists.length ? (
              <ContactComponent
                setVisible={setVisible}
                setFormData={setFormData}
                contactLists={contactLists}
              />
            ) : (
              <NoContactListComponent />
            )}
          </>
        )}
      </ContainerComponent>
    </RedirectFunction>
  );
};

export default HomePage;
