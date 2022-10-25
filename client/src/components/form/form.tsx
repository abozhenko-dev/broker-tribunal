import { ReactNode } from "react";

import { FormProvider, UseFormReturn } from "react-hook-form";

import { ControlledInput } from "./input";
import { Phone } from "./phone";
import { ControlledRating } from "./rating";
import { Selector } from "./selector";
import { ControlledTextarea } from "./textarea";

interface FormProps {
  children: ReactNode;
  methods: UseFormReturn<any>;
  onSubmit: VoidFunction;
}

const Form = (props: FormProps) => {
  // **Props
  const { methods, children, onSubmit } = props;

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </FormProvider>
  );
};

Form.Input = ControlledInput;
Form.TextArea = ControlledTextarea;
Form.Phone = Phone;
Form.Selector = Selector;
Form.Rating = ControlledRating;

export { Form };
