import React from "react";
import styles from "./_styles.module.scss";
import { Status } from "./types";

interface StatusBadgeProps {
  status: Status;
  children: React.ReactNode;
  textOnly?: boolean;
  noBackground?: boolean;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  children,
  textOnly,
  noBackground,
}) => {
  return (
    <div
      className={`
      ${styles.status_badge} 
      ${styles[status.toLowerCase()]}
      ${textOnly ? styles.textOnly : ""}
      ${noBackground ? styles.noBackground : ""}
    `}
    >
      {children}
    </div>
  );
};

export default StatusBadge;
