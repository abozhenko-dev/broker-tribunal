import { Routes } from "@nestjs/core";

import { SiteBlogTagModule } from "@site/blog-tag/blog-tag.module";
import { SiteBlogModule } from "@site/blog/blog.module";
import { SiteBrokerModule } from "@site/broker/broker.module";
import { SiteCategoryModule } from "@site/category/category.module";
import { SiteContactModule } from "@site/contact/contact.module";
import { SiteFeedbackModule } from "@site/feedback/feedback.module";
import { SiteMetadataModule } from "@site/metadata/metadata.module";
import { SiteNewsTagModule } from "@site/news-tag/news-tag.module";
import { SiteNewsModule } from "@site/news/news.module";
import { SiteOverviewCategoryModule } from "@site/overview-category/overview-category.module";
import { SiteOverviewModule } from "@site/overview/overview.module";
import { SiteRegulatorModule } from "@site/regulator/regulator.module";
import { SiteReviewModule } from "@site/review/review.module";
import { SiteSearchModule } from "@site/search/search.module";
import { SiteSeoModule } from "@site/seo/seo.module";
import { SiteModule } from "@site/site.module";
import { SiteSitemapModule } from "@site/sitemap/sitemap.module";

export const SITE_ROUTES: Routes = [
  {
    path: "site",
    module: SiteModule,
    children: [
      {
        path: "blog-tags",
        module: SiteBlogTagModule
      },
      {
        path: "blog",
        module: SiteBlogModule
      },
      {
        path: "brokers",
        module: SiteBrokerModule
      },
      {
        path: "categories",
        module: SiteCategoryModule
      },
      {
        path: "metadata",
        module: SiteMetadataModule
      },
      {
        path: "news-tags",
        module: SiteNewsTagModule
      },
      {
        path: "news",
        module: SiteNewsModule
      },
      {
        path: "overviews",
        module: SiteOverviewModule
      },
      {
        path: "overviews-categories",
        module: SiteOverviewCategoryModule
      },
      {
        path: "reviews",
        module: SiteReviewModule
      },
      {
        path: "regulators",
        module: SiteRegulatorModule
      },
      {
        path: "contacts",
        module: SiteContactModule
      },
      {
        path: "search",
        module: SiteSearchModule
      },
      {
        path: "feedback",
        module: SiteFeedbackModule
      },
      {
        path: "seo",
        module: SiteSeoModule
      },
      {
        path: "sitemap",
        module: SiteSitemapModule
      }
    ]
  }
];
