import { FC } from "react";

import { ComplaintForm, LastNews } from "@components/common";

import { IFaq } from "@declarations";

import { Faq } from "./faq";
import { Feedback } from "./feedback";
import { Home as HomeSection } from "./home";
import { LastAdded } from "./last-added";
import { Recommendations } from "./recommendations";
import { Reviews } from "./reviews";

export const Home: FC<{ faq: IFaq[] }> = (props) => {
  // **Props
  const { faq } = props;

  return (
    <>
      <HomeSection />
      <LastAdded />
      <Reviews />
      <Feedback />
      <Recommendations />
      <ComplaintForm />
      <div className="home-illustrations gutter-section-top gutter-section-bottom">
        <LastNews withAllNews />
        {faq?.length && <Faq faq={faq} />}
      </div>
    </>
  );
};
