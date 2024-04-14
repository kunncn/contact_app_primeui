import { useFormik } from "formik";
import * as Yup from "yup";
import {
  ContainerComponent,
  InputComponent,
  ToastComponent,
} from "../component/ui";
import { Button } from "primereact/button";
import { useContactLogInMutation } from "../service/contact/endpoint/auth.endpoint";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToastHook } from "../hook";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const LoginPage = () => {
  const [mutate, status] = useContactLogInMutation();
  const { errorToastHandler, successToastHandler, errorToast, successToast } =
    useToastHook();
  const nav = useNavigate();

  useEffect(() => {
    if (status?.data?.success === false) {
      console.log(status?.data?.message);
      errorToastHandler({ message: status?.data?.message });
    } else if (status?.data?.success === true) {
      console.log(status?.data);
      successToastHandler(status?.data?.message);
      setTimeout(() => {
        localStorage.setItem("auth", status?.data?.token);
        nav("/");
      }, 2000);
    }
  }, [status, nav]);

  const formik = useFormik({
    validateOnBlur: true,
    validateOnChange: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await mutate(values);
    },
  });

  return (
    <ContainerComponent
      className={[
        "container",
        "mx-auto",
        "w-full",
        "h-screen",
        "flex",
        "justify-center",
        "items-center",
      ]}
    >
      <div className="border border-gray-200 flex-grow p-8 max-w-[500px]">
        <ToastComponent
          toast={!status?.data?.success ? errorToast : successToast}
        />

        <div className="flex justify-between items-center  mb-8">
          <h1 className="text-2xl font-bold text-left ">Login Page</h1>
          <Link
            to="/register"
            className="text-[12px] text-primary font-semibold"
          >
            You Don't have a Account ?
          </Link>
        </div>
        <form onSubmit={formik.handleSubmit}>
          {[
            { type: "email", name: "email", label: "Email" },
            { type: "password", name: "password", label: "Password" },
          ].map((input, index) => (
            <InputComponent
              inputDisabled={formik.isSubmitting}
              key={index}
              value={formik.values[input.name as "email" | "password"]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type={input.type}
              name={input.name}
              errors={formik.errors[input.name as keyof typeof formik.values]}
            />
          ))}
          <Button
            disabled={formik.isSubmitting}
            style={{ backgroundColor: "var(green-700)" }}
            className="btn"
            type="submit"
            raised
          >
            {formik.isSubmitting && (
              <i
                style={{
                  animationIterationCount: "infinite",
                  animationDuration: "1000ms",
                }}
                className="pi pi-spin pi-spinner text-[15px] me-2"
              ></i>
            )}
            {formik.isSubmitting ? "Logging" : "LogIn"}
          </Button>
        </form>
      </div>
    </ContainerComponent>
  );
};

export default LoginPage;
