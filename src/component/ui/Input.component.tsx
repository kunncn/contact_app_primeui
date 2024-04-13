import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";

type InputProps = {
  type: string;
  onChange: React.FormEventHandler<HTMLInputElement> | undefined;
  onBlur: React.FormEventHandler<HTMLInputElement> | undefined;
  value: string;
  name: string;
  errors?: string;
  inputDisabled?: boolean;
};

const InputComponent = ({
  type,
  onChange,
  onBlur,
  value,
  name,
  errors,
  inputDisabled,
}: InputProps) => {
  return (
    <div className="mt-8">
      <FloatLabel>
        <InputText
          className="w-full h-[50px] box-shadow-none border border-gray-400"
          id={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={inputDisabled}
        />
        <label htmlFor={name} className="capitalize">
          {name}
        </label>
      </FloatLabel>
      {errors && (
        <div className="text-red-500 text-[12px] ps-3 mt-1">{errors}</div>
      )}
    </div>
  );
};

export default InputComponent;
