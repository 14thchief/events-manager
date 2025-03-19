import { Inbox } from "../../assets/icons/icons";
import styles from "./_styles.module.scss";

const EmptyData = ({ message = "", iconSrc = null }) => {
  return (
    <div className={styles.emptyData}>
      {iconSrc ? (
        <img src={iconSrc} className="icon" />
      ) : (
        <Inbox className="icon" size={140} />
      )}
      <p>{message || "No data found"}</p>
    </div>
  );
};

export default EmptyData;
