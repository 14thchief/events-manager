import { Delete, Edit, Eye, DownloadCloud } from "src/assets/icons/icons";
import styles from "./_styles.module.scss";
import { Fragment, ReactNode } from "react";

const TableActions = ({ actions }) => {
  const icons = {
    view: (clickAction, color) => (
      <Eye
        size={16}
        color={color}
        style={{ cursor: "pointer" }}
        onClick={clickAction}
      />
    ),
    edit: (clickAction, color) => (
      <Edit
        size={16}
        color={color}
        style={{ cursor: "pointer" }}
        onClick={clickAction}
      />
    ),
    delete: (clickAction, color) => (
      <Delete
        size={16}
        color={color}
        style={{ cursor: "pointer" }}
        onClick={clickAction}
      />
    ),
    download: (clickAction, color, component) =>
      component ?? (
        <DownloadCloud
          size={16}
          color={color}
          style={{ cursor: "pointer" }}
          onClick={clickAction}
        />
      ),
  };
  return (
    <div className={styles.table_actions}>
      {actions.map((action) => {
        const { type, clickAction, color, component } = action;
        const actionIcon = icons[type];
        return (
          <Fragment key={type}>
            {actionIcon(clickAction, color, component)}
          </Fragment>
        );
      })}
    </div>
  );
};
export default TableActions;
