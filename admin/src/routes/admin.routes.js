import { lazy } from "react";

export const DEFAULT_ROUTE = "news";

export const adminRoutes = [
  // Metadata
  {
    path: "metadata",
    component: lazy(() => import("@pages/admin/metadata"))
  },
  {
    path: "metadata/create",
    component: lazy(() => import("@pages/admin/metadata/create"))
  },
  {
    path: "metadata/edit/:id",
    component: lazy(() => import("@pages/admin/metadata/edit"))
  },

  // Broker
  {
    path: "brokers",
    component: lazy(() => import("@pages/admin/brokers"))
  },
  {
    path: "brokers/create",
    component: lazy(() => import("@pages/admin/brokers/create"))
  },
  {
    path: "brokers/edit/:id",
    component: lazy(() => import("@pages/admin/brokers/edit"))
  },

  // Regulators
  {
    path: "regulators",
    component: lazy(() => import("@pages/admin/regulators"))
  },
  {
    path: "regulators/create",
    component: lazy(() => import("@pages/admin/regulators/create"))
  },
  {
    path: "regulators/edit/:id",
    component: lazy(() => import("@pages/admin/regulators/edit"))
  },

  // Rating
  {
    path: "categories",
    component: lazy(() => import("@pages/admin/categories"))
  },
  {
    path: "categories/create",
    component: lazy(() => import("@pages/admin/categories/create"))
  },
  {
    path: "categories/edit/:id",
    component: lazy(() => import("@pages/admin/categories/edit"))
  },

  // Blog
  {
    path: "blog",
    component: lazy(() => import("@pages/admin/blog"))
  },
  {
    path: "blog/create",
    component: lazy(() => import("@pages/admin/blog/create"))
  },
  {
    path: "blog/edit/:id",
    component: lazy(() => import("@pages/admin/blog/edit"))
  },

  // Blog-tags
  {
    path: "blog-tags",
    component: lazy(() => import("@pages/admin/blog-tags"))
  },
  {
    path: "blog-tags/create",
    component: lazy(() => import("@pages/admin/blog-tags/create"))
  },
  {
    path: "blog-tags/edit/:id",
    component: lazy(() => import("@pages/admin/blog-tags/edit"))
  },

  // News
  {
    path: "news",
    component: lazy(() => import("@pages/admin/news"))
  },
  {
    path: "news/create",
    component: lazy(() => import("@pages/admin/news/create"))
  },
  {
    path: "news/edit/:id",
    component: lazy(() => import("@pages/admin/news/edit"))
  },

  // News-tags
  {
    path: "news-tags",
    component: lazy(() => import("@pages/admin/news-tags"))
  },
  {
    path: "news-tags/create",
    component: lazy(() => import("@pages/admin/news-tags/create"))
  },
  {
    path: "news-tags/edit/:id",
    component: lazy(() => import("@pages/admin/news-tags/edit"))
  },

  // Overview-categories
  {
    path: "overviews",
    component: lazy(() => import("@pages/admin/overviews"))
  },
  {
    path: "overviews/create",
    component: lazy(() => import("@pages/admin/overviews/create"))
  },
  {
    path: "overviews/edit/:id",
    component: lazy(() => import("@pages/admin/overviews/edit"))
  },

  // Overview-categories
  {
    path: "overviews-categories",
    component: lazy(() => import("@pages/admin/overviews-categories"))
  },
  {
    path: "overviews-categories/create",
    component: lazy(() => import("@pages/admin/overviews-categories/create"))
  },
  {
    path: "overviews-categories/edit/:id",
    component: lazy(() => import("@pages/admin/overviews-categories/edit"))
  },

  // Reviews
  {
    path: "reviews",
    component: lazy(() => import("@pages/admin/reviews"))
  },

  // Contacts
  {
    path: "contacts",
    component: lazy(() => import("@pages/admin/contacts"))
  },
  {
    path: "contacts/edit",
    component: lazy(() => import("@pages/admin/contacts/edit"))
  },

  // Seo
  {
    path: "seo",
    component: lazy(() => import("@pages/admin/seo"))
  },
  {
    path: "seo/edit",
    component: lazy(() => import("@pages/admin/seo/edit"))
  },

  // Translations
  {
    path: "translations",
    component: lazy(() => import("@pages/admin/translations"))
  },

  // Feedback
  {
    path: "feedback",
    component: lazy(() => import("@pages/admin/feedback"))
  }
];
