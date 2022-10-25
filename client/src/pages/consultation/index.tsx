import { FC } from "react";

import { Attention } from "./attention";
import { Benefits } from "./benefits";
import { Broker } from "./broker";
import { Hero } from "./hero";

export const Consultation: FC = () => (
  <>
    <Hero />
    <Benefits />
    <Broker />
    <Attention />
  </>
);
