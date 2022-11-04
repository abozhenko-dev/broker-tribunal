import { FC, ReactNode } from "react";

import { Modal } from "@components/common";
import { Button, HtmlImage } from "@components/ui";

import { useTranslation } from "@hooks";

interface ThanksModalProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const ThanksModal: FC<ThanksModalProps> = (props) => {
  // **Props
  const { visible, children, onClose } = props;
  const t = useTranslation();

  return (
    <Modal visible={visible} onClose={onClose} bodyClassName="modal-thanks">
      <HtmlImage
        src="media/illustrations/thanks.svg"
        width={352}
        height={347}
        alt=""
        aria-hidden={true}
      />
      <div className="modal-thanks__top">{children}</div>
      <Button variant="primary" fullWidth onClick={onClose}>
        {t.bin.close}
      </Button>
    </Modal>
  );
};
