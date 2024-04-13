import { useEffect } from "react";
import { RedirectFunction } from "../component/function/index";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const nav = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("logout") === "true") {
      nav("/login");
    }
  }, [nav]);
  return (
    <RedirectFunction
      to="/register"
      check={!localStorage.getItem("token") && !localStorage.getItem("logout")}
    >
      <div>HomePage</div>
    </RedirectFunction>
  );
};

export default HomePage;
