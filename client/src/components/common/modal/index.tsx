import { FC, ReactNode, useEffect, useRef, useState } from "react";

import { createPortal } from "react-dom";

import { useScrollLock } from "@hooks";

interface ModalProps {
  visible: boolean;
  children: ReactNode;
  bodyClassName?: string;
  width?: number;
  onClose?: () => void;
}

export const Modal: FC<ModalProps> = (props) => {
  // **Props
  const { visible, width = 83, bodyClassName, children, onClose } = props;
  const { lockScroll, unlockScroll } = useScrollLock();

  // **Local state
  const [isBrowser, setIsBrowser] = useState(false);

  // **Ref
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClose = (): void => {
    onClose();
  };

  useEffect(() => {
    setIsBrowser(true);

    if (!visible) return;

    lockScroll();

    return () => {
      unlockScroll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser) {
    return null;
  }

  return createPortal(
    visible && (
      <div
        style={{ "--width": `${width}rem` } as React.CSSProperties}
        className="modal"
        onClick={handleClose}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-wrapper">
          <div
            ref={modalRef}
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={
                bodyClassName
                  ? `modal-content__body ${bodyClassName}`
                  : "modal-content__body"
              }
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    ),
    document?.body
  );
};
