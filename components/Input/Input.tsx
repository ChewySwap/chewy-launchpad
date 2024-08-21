import { Input as NextUiInput } from "@nextui-org/react";
export interface InputProps {
  value: string;
  children: React.ReactNode;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "number";
  className?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  variant?: "flat" | "bordered" | "underlined" | "faded";
}

export default function Input({
  children,
  value,
  onChange,
  placeholder = "",
  type = "text",
  className = "",
  label = "",
  error = "",
  variant,
  disabled = false,
}: InputProps) {
  return (
    <NextUiInput
      labelPlacement="inside"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      type={type}
      variant={variant}
      label={label}
      className={className}
      disabled={disabled}
    >
      {children}
    </NextUiInput>
  );
}
