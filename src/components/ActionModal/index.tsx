import React from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./_styles.module.scss";
import Button from "../Button";
import {
  closeActionModal,
  selectActionState,
} from "../../redux/features/util/actionModalSlice";
import Modal from "../Modal";
import { gifs } from "../../assets";

const ActionModal: React.FC = () => {
  const {
    isOpen,
    type,
    title,
    content,
    callbackText,
    cancelText,
    extraButtonText,
    callback,
    cancelContent,
    colFlex,
    blockCancel,
  } = useSelector(selectActionState);
  const dispatch = useDispatch();

  const onConfirm = () => {
    if (callback) {
      callback();
    }

    dispatch(closeActionModal());
  };

  const onCancel = () => {
    dispatch(closeActionModal());
  };

  return (
    <Modal
      open={isOpen}
      variant="alert"
      onClose={() => !blockCancel && dispatch(closeActionModal())}
    >
      <div className={styles.action_modal}>
        {gifs[type] ? <img src={gifs[type]} alt="icon" /> : null}

        <div className={styles.body}>
          <h2>{title}</h2>
          <p>{content}</p>
        </div>

        <div className={`${styles.buttons} ${colFlex && styles.flexCol}`}>
          <Button
            variant="main"
            text={callbackText || "Confirm"}
            onClick={onConfirm}
          />
          {!cancelContent && cancelText && (
            <Button
              variant="alt"
              text={cancelText || "Close"}
              onClick={onCancel}
            />
          )}
          {cancelContent && cancelContent}
          {extraButtonText && <Button variant="text" text={extraButtonText} />}
        </div>
      </div>
    </Modal>
  );
};

export default ActionModal;
