import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  to: string;
  check: boolean;
};

const RedirectFunction = ({ to, check, children }: Props) => {
  const nav = useNavigate();
  useEffect(() => {
    if (check) {
      nav(to);
    }
  }, [check, to, nav]);
  return <div>{children}</div>;
};

export default RedirectFunction;
