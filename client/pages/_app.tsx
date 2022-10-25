import type { AppContext, AppProps as NextAppProps } from "next/app";
import NextApp from "next/app";
import Head from "next/head";

import { TranslationProvider } from "@contexts";
import "focus-visible";
import { SWRConfig } from "swr";

import { Footer, Header } from "@components/common";

import {
  $api,
  CategoriesService,
  ContactsService,
  OverviewService,
  TranslationService
} from "@services";

import {
  ICategory,
  IContacts,
  IOverviewCategory,
  ITranslation
} from "@declarations";

import "../src/scss/globals.scss";

interface AppProps extends NextAppProps {
  overviews: IOverviewCategory[];
  categories: ICategory[];
  contacts: IContacts;
  translation: ITranslation;
  fallback: Record<string, any>;
}

const App = ({
  Component,
  pageProps,
  overviews,
  categories,
  contacts,
  translation,
  fallback
}: AppProps) => (
  <TranslationProvider translation={translation}>
    <SWRConfig
      value={{
        fetcher: (url) => $api.get(url).then((res) => res.data),
        fallback
      }}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="wrapper">
        <Header
          overviews={overviews}
          categories={categories}
          contacts={contacts}
        />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer
          overviews={overviews}
          categories={categories}
          contacts={contacts}
        />
      </div>
    </SWRConfig>
  </TranslationProvider>
);

App.getInitialProps = async (ctx: AppContext) => {
  try {
    const appProps = await NextApp.getInitialProps(ctx);

    const [trns, overviews, categories, contacts] = await Promise.all([
      TranslationService.getOne(ctx.ctx.locale || "ru"),
      OverviewService.getCategories(ctx.ctx.locale),
      CategoriesService.getAll(ctx.ctx.locale),
      ContactsService.get()
    ]);

    return {
      ...appProps,
      overviews: overviews.data,
      categories: categories.data,
      contacts: contacts.data,
      translation: trns.data,
      fallback: {
        "/contacts": contacts.data
      }
    };
  } catch (err) {
    ctx.router.push(
      ctx.ctx.locale === ctx.ctx.defaultLocale ? "/" : `/${ctx.ctx.locale}`
    );
  }
};

export default App;
