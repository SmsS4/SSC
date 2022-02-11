

module.exports = ({ env }) => ({
    // redis: {
    //   config: {
    //     connections: {
    //       default: {
    //         connection: {
    //           host: env('REDIS_HOST'),
    //           port: env('REDIS_PORT'),
    //           db: env('REDIS_DB'),
    //           name: "my-redis"
    //         },
    //         settings: {
    //           debug: false,
    //           cluster: false,
    //         },
    //       },
    //     },
    //   },
    // },
    // "strapi-plugin-rest-cache": {
    //     config: {
    //       provider: {
    //         name: "my-redis",
    //         options: {
    //           max: 32767,
    //           connection: "default",
    //         },
    //       },
    //       strategy: {
    //         contentTypes: [
    //           // list of Content-Types UID to cache
    //           "api::tag.tag_uid",
    //           "api::tag.tag",
    //           "api::tags.tag",
    //         ],
    //       },
    //     },
    // },
    sentry: {
        enabled: true,
        config: {
          dsn: env('SENTRY_DSN'),
          sendMetadata: true,
        },
      },
});