interface IMailConfig{
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'tuliosantos@gee.inatel.br',
      name: 'Túlio do Supermercado Amaral',
    },
  },
} as IMailConfig;
