import { Routes } from "@nestjs/core";

import { AdminModule } from "@admin/admin.module";
import { AdminAuthModule } from "@admin/auth/auth.module";
import { AdminBlogTagModule } from "@admin/blog-tag/blog-tag.module";
import { AdminBlogModule } from "@admin/blog/blog.module";
import { AdminBrokerModule } from "@admin/broker/broker.module";
import { AdminBucketModule } from "@admin/bucket/bucket.module";
import { AdminCategoryModule } from "@admin/category/category.module";
import { AdminContactModule } from "@admin/contact/contact.module";
import { AdminFeedbackModule } from "@admin/feedback/feedback.module";
import { AdminMetadataModule } from "@admin/metadata/metadata.module";
import { AdminNewsTagModule } from "@admin/news-tag/news-tag.module";
import { AdminNewsModule } from "@admin/news/news.module";
import { AdminOverviewCategoryModule } from "@admin/overview-category/overview-category.module";
import { AdminOverviewModule } from "@admin/overview/overview.module";
import { AdminRegulatorModule } from "@admin/regulator/regulator.module";
import { AdminReviewModule } from "@admin/review/review.module";
import { AdminSeoModule } from "@admin/seo/seo.module";
import { AdminTranslationModule } from "@admin/translation/translation.module";

export const ADMIN_ROUTES: Routes = [
  {
    path: "admin",
    module: AdminModule,
    children: [
      {
        path: "auth",
        module: AdminAuthModule
      },
      {
        path: "bucket",
        module: AdminBucketModule
      },
      {
        path: "blog",
        module: AdminBlogModule
      },
      {
        path: "blog-tags",
        module: AdminBlogTagModule
      },
      {
        path: "brokers",
        module: AdminBrokerModule
      },
      {
        path: "categories",
        module: AdminCategoryModule
      },
      {
        path: "metadata",
        module: AdminMetadataModule
      },
      {
        path: "news",
        module: AdminNewsModule
      },
      {
        path: "news-tags",
        module: AdminNewsTagModule
      },
      {
        path: "overviews",
        module: AdminOverviewModule
      },
      {
        path: "overviews-categories",
        module: AdminOverviewCategoryModule
      },
      {
        path: "reviews",
        module: AdminReviewModule
      },
      {
        path: "regulators",
        module: AdminRegulatorModule
      },
      {
        path: "contacts",
        module: AdminContactModule
      },
      {
        path: "feedback",
        module: AdminFeedbackModule
      },
      {
        path: "translations",
        module: AdminTranslationModule
      },
      {
        path: "seo",
        module: AdminSeoModule
      }
    ]
  }
];
