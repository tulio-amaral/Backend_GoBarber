export default {
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    expiresIn: '300d', // dias para expirar o token. Usar 1d, no geral
  },
};
