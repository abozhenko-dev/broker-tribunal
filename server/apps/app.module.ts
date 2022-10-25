import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RouterModule } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { ScheduleModule } from "@nestjs/schedule";

import { MailmanModule } from "@squareboat/nest-mailman";

import { getEnvPaths, getJWTConfig, getMailmanConfig, getMongoDbConfig } from "@common/configs";
import { GlobalModule } from "@common/modules";
import { API_ROUTES } from "@common/routes";

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

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvPaths(),
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoDbConfig
    }),
    JwtModule.registerAsync({
      useFactory: getJWTConfig
    }),
    MailmanModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMailmanConfig
    }),
    ScheduleModule.forRoot(),
    RouterModule.register(API_ROUTES),
    GlobalModule,
    AdminModule,
    AdminAuthModule,
    AdminBucketModule,
    AdminBlogModule,
    AdminBlogTagModule,
    AdminBrokerModule,
    AdminCategoryModule,
    AdminMetadataModule,
    AdminNewsModule,
    AdminNewsTagModule,
    AdminReviewModule,
    AdminOverviewModule,
    AdminOverviewCategoryModule,
    AdminRegulatorModule,
    AdminContactModule,
    AdminFeedbackModule,
    AdminTranslationModule,
    AdminSeoModule,
    SiteModule,
    SiteBlogTagModule,
    SiteBlogModule,
    SiteBrokerModule,
    SiteCategoryModule,
    SiteMetadataModule,
    SiteNewsTagModule,
    SiteNewsModule,
    SiteOverviewModule,
    SiteOverviewCategoryModule,
    SiteRegulatorModule,
    SiteReviewModule,
    SiteContactModule,
    SiteSearchModule,
    SiteFeedbackModule,
    SiteSeoModule,
    SiteSitemapModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
