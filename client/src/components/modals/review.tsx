import { FC, useState } from "react";

import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useForm } from "react-hook-form";

import { Modal } from "@components/common";
import { Form } from "@components/form";
import { Button, Typography } from "@components/ui";

import { ReviewsService } from "@services";

import { useTranslation } from "@hooks";

import { ReviewSchema } from "@utils/schemas";

import { ThanksModal } from "./thanks";

interface ReviewModalProps {
  visible: boolean;
  params: {
    entity: "broker" | "regulator";
    entitySlug: string;
  };
  onClose: () => void;
}

export const ReviewModal: FC<ReviewModalProps> = (props) => {
  // **Props
  const { visible, params, onClose } = props;
  const t = useTranslation();

  // **Local state
  const [isOpen, setIsOpen] = useState(false);

  // **Form
  const methods = useForm<ReviewSchema>({
    resolver: classValidatorResolver(ReviewSchema)
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = methods;

  const onSubmit = async (data: ReviewSchema) => {
    try {
      const resp = await ReviewsService.create({ ...data, ...params });

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
      <Modal visible={visible} onClose={onClose} bodyClassName="modal-review">
        <Typography variant="h2">{t.bin.leaveFeedbackOnCompany}</Typography>
        <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-review__form">
            <Form.Rating name="rating" label={t.form.labels.rating} />
            <div className="modal-review__form-grid">
              <Form.Input
                name="authorName"
                label={t.form.labels.name}
                placeholder={t.form.placeholder.name}
              />
              <Form.Input
                name="authorEmail"
                label={t.form.labels.email}
                placeholder={t.form.placeholder.email}
              />
              <Form.Phone name="authorPhone" label={t.form.labels.phone} />
              <Form.Input
                name="problem"
                label={t.form.labels.shortDescription}
                placeholder={t.form.placeholder.shortDescription}
              />
            </div>
            <Form.TextArea
              name="comment"
              label={t.form.labels.comment}
              placeholder={t.form.placeholder.writeComment}
            />
          </div>
          <Button variant="primary" fullWidth disabled={isSubmitting}>
            {isSubmitting ? t.bin.submitting : t.bin.leaveFeedbackOnCompany}
          </Button>
        </Form>
      </Modal>
      <ThanksModal visible={isOpen} onClose={() => setIsOpen(false)}>
        <Typography variant="h3">{t.bin.thanksForInfo}</Typography>
        <Typography color="grey">{t.bin.adminCheck}</Typography>
      </ThanksModal>
    </>
  );
};
