import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  return {
    type: 'postgres',
    logging: true,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    autoLoadEntities: true,
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
    migrationsRun: process.env.DATABASE_MIGRATIONSRUN === 'true',
    entities: [
      process.env.NODE_ENV == 'production' ? 'dist' : 'src' + '/**/*.entity.ts',
    ],
    migrations: [
      process.env.NODE_ENV == 'production'
        ? 'dist'
        : 'src' + '/migrations/*{.ts,.js}',
    ],
    cli: {
      migrationsDir: 'src/migrations',
    },
    extra: {
      ssl: process.env.DATABASE_SSL === 'true',
    },
  };
});
