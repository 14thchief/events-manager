import { svgs } from "../../assets";
import styles from "./_styles.module.scss";

const Button = ({
  variant = "main",
  width = "full",
  size = "big",
  iconRight = false,
  text,
  icon,
  isLoading,
  disabled,
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
