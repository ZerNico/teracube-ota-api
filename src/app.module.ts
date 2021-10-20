import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import configuration from './config/configuration';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { UpdatesModule } from './updates/updates.module';
import { DevicesModule } from './devices/devices.module';

@Module({
  imports: [
    AutomapperModule.forRoot({
      options: [{ name: 'classes', pluginInitializer: classes }],
      singular: true,
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'ci', 'staging', 'production', 'demo')
          .default('production'),
        INVITE: Joi.boolean().default(true),
        PREFIX: Joi.string().default(''),
        PORT: Joi.number().default(3000),
        JWT_SECRET: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_DATABASE: Joi.string().required(),
        DATABASE_SSL: Joi.boolean().default(true),
        DATABASE_SYNCHRONIZE: Joi.boolean().default(false),
      }),
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        extra: {
          ssl: false,
        },
        synchronize: configService.get('database.synchronize'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    UpdatesModule,
    DevicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
