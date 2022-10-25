import { FC, ReactNode, useEffect, useState } from "react";

import { createPortal } from "react-dom";

import { useScrollLock, useTranslation } from "@hooks";

interface DrawerProps {
  visible: boolean;
  children: ReactNode;
  className?: string;
  onClose: () => void;
}

export const Drawer: FC<DrawerProps> = (props) => {
  // **Props
  const { visible, children, className, onClose } = props;
  const { lockScroll, unlockScroll } = useScrollLock();
  const t = useTranslation();

  // **Local state
  const [isBrowser, setIsBrowser] = useState(false);

  const handleClose = () => {
    onClose();
    unlockScroll();
  };

  useEffect(() => {
    if (!visible) return;

    lockScroll();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser) {
    return null;
  }

  return createPortal(
    <div className={visible ? "drawer open" : "drawer"}>
      <div className="drawer-backdrop" onClick={handleClose}>
        <div className="drawer-modal" onClick={(e) => e.stopPropagation()}>
          <div
            className={
              className ? `drawer-content ${className}` : "drawer-content"
            }
          >
            {children}
          </div>
          <button
            className="drawer-close"
            onClick={handleClose}
            aria-label={
              visible
                ? (t.bin.drawerClose as string)
                : (t.bin.drawerOpen as string)
            }
          ></button>
        </div>
      </div>
    </div>,
    document?.body
  );
};
