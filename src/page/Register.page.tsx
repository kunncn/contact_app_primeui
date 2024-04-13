import { useFormik } from "formik";
import * as Yup from "yup";
import { ContainerComponent, InputComponent } from "../component/ui";
import { Button } from "primereact/button";
import { useContactRegisterMutation } from "../service/contact/endpoint/auth.endpoint";
import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

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
  const errorToast = useRef<Toast>(null);
  const errorToastBtnRef = useRef<HTMLButtonElement>(null);
  const successToast = useRef<Toast>(null);
  const successToastBtnRef = useRef<HTMLButtonElement>(null);
  const nav = useNavigate();

  useEffect(() => {
    if (status.isError) {
      errorToastBtnRef?.current?.click();
    } else if (status.isSuccess) {
      console.log(status.data.message);
      successToastBtnRef?.current?.click();
      setTimeout(() => {
        nav("/login");
      }, 2000);
    }
  }, [status]);

  const errorToastHandler = () => {
    errorToast.current?.show({
      life: 4500,
      severity: "error",
      summary: "Rejected",
      detail:
        (status?.error?.data?.message as string) || "Something went wrong",
    });
  };

  const successToastHandler = () => {
    successToast.current?.show({
      life: 1500,
      severity: "success",
      summary: "Success",
      detail: (status?.data?.message as string) || "Register Successfully",
    });
  };

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
        <Toast ref={errorToast} position="top-center" />
        {/* below btn is only for error toast alert */}
        <Button
          className="btn w-fit hidden"
          ref={errorToastBtnRef}
          onClick={errorToastHandler}
        />

        <Toast ref={successToast} position="top-center" />
        {/* below btn is only for success toast alert */}
        <Button
          className="btn w-fit hidden"
          ref={successToastBtnRef}
          onClick={successToastHandler}
        />

        <div className="flex justify-between items-center  mb-8">
          <h1 className="text-2xl font-bold text-left ">Register Page</h1>
          <Link to="/login" className="text-[12px] text-primary font-semibold">
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
  );
};

export default RegisterPage;
