import { ConnectionOptions } from 'typeorm';
import { join } from 'path'

import configuration from '../config/configuration';

const config = configuration();

console.log(__dirname);

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  extra: {
    ssl: config.database.ssl,
  },
  entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '../migrations/*.entity{.ts,.js}')],
  synchronize: config.database.synchronize,
  migrationsRun: false,
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = connectionOptions;
