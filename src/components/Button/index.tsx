import { svgs } from "../../assets";
import styles from "./_styles.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "main" | "secondary" | "alt"; // Add more variants as needed
  width?: "full" | "fit" | "auto" | number; // 'full' for 100%, 'auto' for content-based, or a number for pixel width
  size?: "big" | "medium" | "small" | "very-small"; // Add more sizes as needed
  iconRight?: boolean;
  text?: string;
  icon?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "main",
  width = "full",
  size = "big",
  iconRight = false,
  text = "",
  icon = null,
  isLoading = false,
  disabled = false,
  ...restProps
}) => {
  return (
    <button
      className={`${styles[variant]} ${styles[size]} ${
        width && typeof width !== "number" && styles[width]
      } ${iconRight && styles["icon_right"]}`}
      style={{ width: typeof width === "number" ? `${width}px` : undefined }}
      {...restProps}
      disabled={isLoading || disabled}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {text && text}
      {isLoading && (
        <img className={styles.loading} src={svgs.loading} alt="loading"></img>
      )}
    </button>
  );
};
export default Button;
