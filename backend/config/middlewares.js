module.exports =  ({ env }) => ([
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  // {
  //   resolve: 'src/api/tag/middlewares/my-middleware.js',
  //   config: {},
  // },
  {
    resolve: 'middlewares/prom.js',
    config: {
      port: env("PROMETHEUS_PORT")
    },
  },
  {
    resolve: 'middlewares/cache.js',
    config: {
      port: env("REDIS_PORT"),
      host: env("REDIS_HOST"),
      db: env("REDIS_DB"),
      cacheRoutes: [
        "tags", "blog"
      ]
    },
  },
]);
