import { FC, useState } from "react";

import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useForm } from "react-hook-form";

import { Form } from "@components/form";
import { ThanksModal } from "@components/modals";
import { Button, Container, HtmlImage, Typography } from "@components/ui";

import { FeedbackService } from "@services";

import { useTranslation } from "@hooks";

import { PromoSchema } from "@utils/schemas";

export const Promo: FC<{ text: string }> = (props) => {
  // **Props
  const { text = "" } = props;
  const t = useTranslation();

  // **Local state
  const [isOpen, setIsOpen] = useState(false);

  // **Form
  const methods = useForm<PromoSchema>({
    resolver: classValidatorResolver(PromoSchema)
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = methods;

  const onSubmit = async (data: PromoSchema) => {
    try {
      const resp = await FeedbackService.promotion(data);

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
      <div className="promo gutter-section-bottom">
        <Container>
          <div className="promo__wrapper">
            <div className="promo__wrapper-top">
              <div className="promo__wrapper-img">
                <HtmlImage
                  src="/media/illustrations/promo.svg"
                  width={242}
                  height={294}
                />
              </div>
              <div
                className="promo__wrapper-info"
                dangerouslySetInnerHTML={{
                  __html: text?.replace(/<p>&nbsp;<\/p>/g, "")
                }}
              ></div>
            </div>
            <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <div className="promo__form">
                <div className="promo__inner">
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
                </div>
                <Form.TextArea
                  name="comment"
                  label={t.form.labels.message}
                  placeholder={t.form.placeholder.message}
                />
              </div>
              <Button variant="primary" fullWidth>
                {isSubmitting ? t.bin.submitting : t.bin.message}
              </Button>
            </Form>
          </div>
        </Container>
      </div>
      <ThanksModal visible={isOpen} onClose={() => setIsOpen(false)}>
        <Typography variant="h3">{t.bin.thanks}</Typography>
        <Typography color="grey">{t.bin.connectSoon}</Typography>
      </ThanksModal>
    </>
  );
};
