import React from "react";

interface ButtonProps {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "button" | "reset";
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  fullWidth?: boolean;
}

const variantClasses = {
  primary:
    "bg-[#6A8C51] hover:bg-[#4F6F3B] focus:ring-green-300",
  secondary:
    "bg-gray-500 hover:bg-gray-600 focus:ring-gray-300",
  danger:
    "bg-red-500 hover:bg-red-600 focus:ring-red-300"
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  fullWidth = false
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3
        rounded-lg
        text-white
        text-sm font-semibold
        shadow
        transition-all
        duration-200
        focus:outline-none
        focus:ring-4
        ${variantClasses[variant]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${fullWidth ? "w-full" : ""}
      `}
    >
      {label}
    </button>
  );
};

export default Button;

