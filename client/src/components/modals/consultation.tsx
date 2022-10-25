import { FC, useState } from "react";

import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useForm } from "react-hook-form";

import { Modal } from "@components/common";
import { Form } from "@components/form";
import { Button, Typography } from "@components/ui";

import { FeedbackService } from "@services";

import { useTranslation } from "@hooks";

import { ConsultationSchema } from "@utils/schemas";

import { ThanksModal } from "./thanks";

interface ConsultationModalProps {
  visible: boolean;
  onClose: () => void;
}

export const ConsultationModal: FC<ConsultationModalProps> = (props) => {
  // **Props
  const { visible, onClose } = props;
  const t = useTranslation();

  // **Local state
  const [isOpen, setIsOpen] = useState(false);

  // **Form
  const methods = useForm<ConsultationSchema>({
    resolver: classValidatorResolver(ConsultationSchema)
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = methods;

  const onSubmit = async (data: ConsultationSchema) => {
    try {
      const resp = await FeedbackService.consultation(data);

      if (resp.status !== 200) {
        throw resp;
      }

      setIsOpen(true);
      reset();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  return (
    <>
      <Modal
        visible={visible}
        onClose={onClose}
        bodyClassName="modal-consultation"
      >
        <div className="modal-consultation__top">
          <Typography variant="h2">{t.bin.freeConsultation}</Typography>
          <Typography color="dark">{t.bin.leaveYourData}</Typography>
        </div>
        <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-consultation__form">
            <Form.Input
              name="name"
              label={t.form.labels.name}
              placeholder={t.form.placeholder.name}
            />
            <Form.Input
              name="email"
              label={t.form.labels.email}
              placeholder={t.form.placeholder.email}
            />
            <Form.Phone name="phone" label={t.form.labels.phone} />
            <Form.TextArea
              name="comment"
              label={t.form.labels.comment}
              placeholder={t.form.placeholder.complaint}
            />
            <Form.Selector
              type="checkbox"
              name="agreement"
              label={t.form.labels.giveAccess}
              value="Согласен"
            />
          </div>
          <Button variant="primary" fullWidth disabled={isSubmitting}>
            {isSubmitting ? t.bin.submitting : t.bin.send}
          </Button>
        </Form>
      </Modal>
      <ThanksModal visible={isOpen} onClose={() => setIsOpen(false)}>
        <Typography variant="h3">{t.bin.thanks}</Typography>
        <Typography color="grey">{t.bin.connectSoon}</Typography>
      </ThanksModal>
    </>
  );
};
