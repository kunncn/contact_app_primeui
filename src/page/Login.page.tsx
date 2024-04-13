import { useFormik } from "formik";
import * as Yup from "yup";
import { ContainerComponent, InputComponent } from "../component/ui";
import { Button } from "primereact/button";
import { useContactLogInMutation } from "../service/contact/endpoint/auth.endpoint";
import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

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
  const toast = useRef<Toast>(null);
  const toastBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (status?.data?.success === false) {
      toastBtnRef?.current?.click();
    }
  }, [status]);

  const show = () => {
    toast.current?.show({
      life: 4000,
      severity: "error",
      summary: "Rejected",
      detail: (status?.data?.message as string) || "Something went wrong",
    });
  };

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
        <Toast ref={toast} position="top-center" />
        {/* below btn is only for toast alert */}
        <Button className="btn w-fit hidden" ref={toastBtnRef} onClick={show} />

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
