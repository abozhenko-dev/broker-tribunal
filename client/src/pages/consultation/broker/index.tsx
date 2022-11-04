import { FC, useState } from "react";

import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useForm } from "react-hook-form";

import { Form } from "@components/form";
import { ThanksModal } from "@components/modals";
import { Button, Container, HtmlImage, Typography } from "@components/ui";

import { FeedbackService } from "@services";

import { useTranslation } from "@hooks";

import { ConsultationSchema } from "@utils/schemas";

export const Broker: FC = () => {
  // **Props
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
      <div className="broker">
        <Container>
          <div className="complaint-wrapper">
            <div className="complaint-wrapper__top">
              <Typography tag="h2" variant="h2">
                {t.bin.haveDoubts}
              </Typography>
              <Typography tag="p">{t.bin.haveExperience}</Typography>
            </div>
            <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <div className="complaint-form">
                <div className="complaint-form__grid">
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
                  <Form.Input
                    name="tradingExperience"
                    label={t.form.labels.experiance}
                    placeholder={t.form.placeholder.experiance}
                  />
                </div>
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
                {isSubmitting ? t.bin.submitting : t.bin.consultation}
              </Button>
            </Form>
          </div>
          <div className="broker-background">
            <HtmlImage
              src="media/illustrations/broker.svg"
              width={511}
              height={714}
              alt=""
              aria-hidden={true}
            />
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
