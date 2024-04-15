import { useFormik } from "formik";
import * as Yup from "yup";
import {
  ContainerComponent,
  InputComponent,
  ToastComponent,
} from "../component/ui";
import { Button } from "primereact/button";
import { useContactRegisterMutation } from "../service/contact/endpoint/auth.endpoint";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToastHook } from "../hook";
import { RedirectFunction } from "../component/function";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "At least 2 characters"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Password confirmation is required"),
});

const RegisterPage = () => {
  const [mutate, status] = useContactRegisterMutation();

  const nav = useNavigate();
  const { errorToast, errorToastHandler, successToast, successToastHandler } =
    useToastHook();

  useEffect(() => {
    if (status.isError) {
      errorToastHandler({ message: status?.error?.data?.message });
    } else if (status.isSuccess) {
      successToastHandler(status?.data?.message);
      setTimeout(() => {
        nav("/login");
      }, 2000);
    }
  }, [nav, status]);

  const formik = useFormik({
    validateOnBlur: true,
    validateOnChange: true,
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await mutate(values);
    },
  });

  return (
    <RedirectFunction
      check={
        localStorage.getItem("auth") &&
        localStorage.getItem("logout") === "false"
      }
      to="/"
    >
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
          <ToastComponent toast={status.isError ? errorToast : successToast} />

          <div className="flex justify-between items-center  mb-8">
            <h1 className="text-2xl font-bold text-left ">Register Page</h1>
            <Link
              to="/login"
              className="text-[12px] text-primary font-semibold"
            >
              You have a Account ?
            </Link>
          </div>
          <form onSubmit={formik.handleSubmit}>
            {[
              { type: "text", name: "name", label: "Name" },
              { type: "email", name: "email", label: "Email" },
              { type: "password", name: "password", label: "Password" },
              {
                type: "password",
                name: "password_confirmation",
                label: "Confirm Password",
              },
            ].map((input, index) => (
              <InputComponent
                inputDisabled={formik.isSubmitting}
                key={index}
                value={
                  formik.values[
                    input.name as
                      | "name"
                      | "email"
                      | "password"
                      | "password_confirmation"
                  ]
                }
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
              {formik.isSubmitting ? "Registering" : "Register"}
            </Button>
          </form>
        </div>
      </ContainerComponent>
    </RedirectFunction>
  );
};

export default RegisterPage;
