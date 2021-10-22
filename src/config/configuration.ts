export default () => ({
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  prefix: process.env.PREFIX,
  invite: process.env.INVITE === 'true',
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
    ssl: process.env.DATABASE_SSL === 'true',
    migrationsRun: process.env.DATABASE_MIGRATIONSRUN === 'true',
  },
});
