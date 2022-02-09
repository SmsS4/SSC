module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '0c643bae48cecde6cb55dfc4b68576f7'),
  },
});
