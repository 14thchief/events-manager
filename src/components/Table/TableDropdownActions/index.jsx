import { useEffect, useRef } from "react";
import { EllipsesVertical as ActionIcon } from "../../../assets/icons/icons";
import useClickOutside from "../../../hooks/useClickOutside";
import styles from "./_styles.module.scss";
import Button from "../../../components/Button";

const TableDropdownActions = ({ actions }) => {
  const { open, setOpen, dropdownRef } = useClickOutside();
  const contentRef = useRef(null);

  const handleToggleDropdown = () => {
    setOpen(!open);
    // scrollToContent()
  };

  useEffect(() => {
    if (open && contentRef.current) {
      contentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [open]);

  return (
    <div ref={dropdownRef} className={styles.dropdown_action}>
      <Button
        variant={"transparent"}
        width={"fit"}
        size={"small"}
        icon={<ActionIcon size={12} />}
        onClick={handleToggleDropdown}
      />

      {actions.length > 0 && open && (
        <div
          ref={open ? contentRef : null}
          className={`${styles.content} ${open ? styles.active : ""}`}
        >
          {actions.map((item, index) => {
            if (item.show === false) {
              return null;
            }

            return (
              (
                <div className="hover:bg-primary transition transition-bg">
                  {item.customComponent}
                </div>
              ) ?? (
                <button
                  key={index}
                  className={styles.actionButton}
                  onClick={() => {
                    item.onClick(item);
                    setOpen(false);
                  }}
                >
                  {item.icon ?? ""}
                  <p>{item.label}</p>
                </button>
              )
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TableDropdownActions;
