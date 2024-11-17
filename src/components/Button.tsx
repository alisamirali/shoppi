import { twMerge } from "tailwind-merge";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({ children, className, disabled, onClick }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={twMerge(
        "bg-lightOrange text-base text-white hover:bg-darkOrange hoverEffect md:px-8 md:py-3 rounded-full font-semibold",
        className
      )}
    >
      {children}
    </button>
  );
};
export default Button;
