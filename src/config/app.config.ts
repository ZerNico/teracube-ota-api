import { registerAs } from '@nestjs/config';

export default registerAs('app', () => {
  return {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    prefix: process.env.PREFIX,
    invite: process.env.INVITE === 'true',
    jwt: {
      secret: process.env.JWT_SECRET,
    },
  };
});
