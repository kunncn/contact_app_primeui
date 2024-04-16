import { useFormik } from "formik";
import * as Yup from "yup";
import { InputComponent, ToastComponent } from "../../component/ui/";
import { Button } from "primereact/button";
import {
  useCreateContactMutation,
  useUpdateContactMutation,
} from "../../service/contact/endpoint/contact.endpoint";
import { useToastHook } from "../../hook";
import { Dispatch, SetStateAction, useEffect } from "react";

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
  formData,
}: {
  setVisible: Dispatch<SetStateAction<boolean>>;
  formData: {
    name: string;
    email: string;
    phone: string;
    address: string;
    id?: number;
  };
}) => {
  const { errorToast, successToast, errorToastHandler, successToastHandler } =
    useToastHook();
  const [createContactMutate, createContactStatus] = useCreateContactMutation();
  const [updateContactMutate, updateContactStatus] = useUpdateContactMutation();

  useEffect(() => {
    if (createContactStatus?.data?.success) {
      successToastHandler({
        message: createContactStatus?.data?.message,
      });
      setTimeout(() => {
        setVisible(false);
      }, 1000);
    } else if (updateContactStatus?.data?.success) {
      successToastHandler({
        message: updateContactStatus?.data?.message,
      });
      setTimeout(() => {
        setVisible(false);
      }, 1000);
    } else if (createContactStatus?.data?.success === false) {
      errorToastHandler({
        message: createContactStatus?.data?.message,
      });
    } else if (updateContactStatus?.data?.success === false) {
      errorToastHandler({
        message: updateContactStatus?.data?.message,
      });
    }
  }, [createContactStatus?.data?.success, updateContactStatus?.data?.success]);

  console.log(updateContactStatus);

  const formik = useFormik({
    validateOnBlur: true,
    validateOnChange: true,
    initialValues: {
      name: formData?.name || "",
      email: formData?.email || "",
      phone: formData?.phone || "",
      address: formData?.address || "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (formData.id && formData.name && formData.phone) {
        await updateContactMutate({ ...values, id: formData.id });
      } else {
        await createContactMutate(values);
      }
    },
  });

  return (
    <>
      <ToastComponent
        toast={
          createContactStatus?.data?.success ||
          updateContactStatus?.data?.success
            ? successToast
            : errorToast
        }
      />
      <form onSubmit={formik.handleSubmit}>
        {[
          { type: "text", name: "name", label: "Name" },
          { type: "tel", name: "phone", label: "Phone" },
          { type: "email", name: "email", label: "Email" },
          { type: "text", name: "address", label: "Address" },
        ].map((input, index) => (
          <InputComponent
            inputDisabled={formik.isSubmitting}
            key={index}
            value={formik.values[input.name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type={input.type}
            name={input.name}
            errors={formik.errors[input.name]}
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
          {formData?.name && formData?.phone
            ? formik.isSubmitting
              ? "Updating"
              : "Update"
            : formik.isSubmitting
            ? "Creating"
            : "Create"}
        </Button>
      </form>
    </>
  );
};

export default FormComponent;
