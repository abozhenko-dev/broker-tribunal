import { FC, useState } from "react";

import Link from "next/link";

import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useForm } from "react-hook-form";

import { Form } from "@components/form";
import { ThanksModal } from "@components/modals";
import { Button, Container, HtmlImage, Typography } from "@components/ui";

import { FeedbackService } from "@services";

import { useTranslation } from "@hooks";

import { ComplaintSchema } from "@utils/schemas";

export const ComplaintForm: FC = () => {
  // **Props
  const t = useTranslation();

  // **Local state
  const [isOpen, setIsOpen] = useState(false);

  // **Form
  const methods = useForm<ComplaintSchema>({
    resolver: classValidatorResolver(ComplaintSchema)
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = methods;

  const onSubmit = async (data: ComplaintSchema) => {
    try {
      const resp = await FeedbackService.complaint(data);

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
      <div id="complaint" className="complaint">
        <Container>
          <div className="complaint-wrapper">
            <div className="complaint-wrapper__top">
              <Typography tag="h2" variant="h2">
                {t.bin.leaveComplaint}
              </Typography>
              <Typography>{t.bin.questions}</Typography>
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
                    name="brokerName"
                    label={t.form.labels.brokerName}
                    placeholder={t.form.placeholder.brokerName}
                  />
                </div>
                <Form.TextArea
                  name="comment"
                  label={t.form.labels.comment}
                  placeholder={t.form.placeholder.complaint}
                />
                <Form.Selector
                  name="agreement"
                  type="checkbox"
                  value="Согласен"
                  label={
                    <>
                      {t.form.labels.agreeWith}{" "}
                      <Link href="/policy">
                        <a>{t.navigation.policy1}</a>
                      </Link>
                    </>
                  }
                />
              </div>

              <Button variant="primary" fullWidth disabled={isSubmitting}>
                {isSubmitting ? t.bin.submitting : t.bin.leaveComplaint}
              </Button>
            </Form>
          </div>
          <div className="complaint-background">
            <HtmlImage
              src="/media/illustrations/complaint.svg"
              width={1112}
              height={896}
              alt=""
              aria-hidden={true}
            />
          </div>
        </Container>
      </div>
      <ThanksModal visible={isOpen} onClose={() => setIsOpen(false)}>
        <Typography variant="h3">{t.bin.thanksForInfo}</Typography>
        <Typography color="grey">{t.bin.complaintText}</Typography>
      </ThanksModal>
    </>
  );
};
