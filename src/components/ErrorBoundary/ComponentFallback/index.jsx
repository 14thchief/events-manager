import { svgs } from "src/assets";
import styles from "./_styles.module.scss";
import Button from "components/Button";

const ComponentFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className={styles.component_fallback}>
      <img src={svgs.error} alt="error illustration" />
      <div className={styles.message}>
        <h1>
          Oops! <span>💔</span> <br /> Something went wrong.
        </h1>
        <h4>
          But it's most likely not your fault. Please try again or contact
          support.
        </h4>
        <div className={styles.error_message}>
          <p>{error.message}</p>
        </div>
        <div className={styles.buttons}>
          <Button text="	Try again" onClick={resetErrorBoundary} />
          <Button text="Contact Support" variant="alt" />
        </div>
      </div>
    </div>
  );
};

export default ComponentFallback;
