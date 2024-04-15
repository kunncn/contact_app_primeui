import { useFormik } from "formik";
import * as Yup from "yup";
import { InputComponent, ToastComponent } from "../../component/ui/";
import { Button } from "primereact/button";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useCreateContactMutation } from "../../service/contact/endpoint/contact.endpoint";
import { useToastHook } from "../../hook";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces")
    .min(2, "At least 2 characters"),
  email: Yup.string().email("Invalid email format"),
  phone: Yup.string()
    .required("Phone is required")
    .test("isValidPhoneNumber", "Invalid phone number format", (value) =>
      /^[+]?[\d]+$/.test(value)
    ),
  address: Yup.string(),
});
const FormComponent = ({
  setVisible,
}: {
  setVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  const { errorToast, successToast, errorToastHandler, successToastHandler } =
    useToastHook();
  const [createContactMutate, createContactStatus] = useCreateContactMutation();

  useEffect(() => {
    if (createContactStatus.isError) {
      errorToastHandler({ message: createContactStatus?.error?.data?.message });
    } else if (createContactStatus.isSuccess) {
      successToastHandler({ message: createContactStatus?.data?.message });
      setTimeout(() => {
        setVisible(false);
      }, 2000);
    }
  }, [createContactStatus]);

  const formik = useFormik({
    validateOnBlur: true,
    validateOnChange: true,
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await createContactMutate(values);
    },
  });
  return (
    <>
      <ToastComponent
        toast={!createContactStatus?.data?.success ? errorToast : successToast}
      />
      <form onSubmit={formik.handleSubmit}>
        {[
          { type: "text", name: "name", label: "Name" },
          { type: "tel", name: "phone", label: "Phone" },
          { type: "email", name: "email", label: "Email" },
          {
            type: "text",
            name: "address",
            label: "address",
          },
        ].map((input, index) => (
          <InputComponent
            inputDisabled={formik.isSubmitting}
            key={index}
            value={
              formik.values[
                input.name as "name" | "phone" | "email" | "address"
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
          {formik.isSubmitting ? "Submitting" : "Submit"}
        </Button>
      </form>
    </>
  );
};

export default FormComponent;
