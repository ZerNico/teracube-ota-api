# Teracube OTA API

## Description

RESTful API for Teracube OTA updates built on [Nest](https://github.com/nestjs/nest).

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod

# generating migrations
$ pnpm run migration:generate -- -n <name>
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Config

Environment Variable (supports .env)

| Variable               | Default      | Choices                                                 | Required                 | Description                                                        |
|------------------------|--------------|---------------------------------------------------------|--------------------------|--------------------------------------------------------------------|
| NODE_ENV               | `production` | `development`, `ci`, `staging`, `production` or `demo`  | <ul><li>- [ ] </li></ul> | Environment for Nodejs                                             |
| JWT_SECRET             |              | Any string                                              | <ul><li>- [x] </li></ul> | Secret for encoding JWTs (Really keep this secret)                 |
| PREFIX                 |              | Any string                                              | <ul><li>- [ ] </li></ul> | Prefix in front of every API route                                 |
| INVITE                 | `true`       | `true` or `false`                                       | <ul><li>- [ ] </li></ul> | Require invites for registration                                   |
| PORT                   | `3000`       | Valid port value                                        | <ul><li>- [ ] </li></ul> | Port to run this application on                                    |
| DATABASE_HOST          |              | Valid hostname or IP address                            | <ul><li>- [x] </li></ul> | Host of Postgres database                                          |
| DATABASE_PORT          |              | Valid port value                                        | <ul><li>- [x] </li></ul> | Port of Postgres database                                          |
| DATABASE_USERNAME      |              | Database username                                       | <ul><li>- [x] </li></ul> | Username of Postgres database                                      |
| DATABASE_PASSWORD      |              | Database Password                                       | <ul><li>- [x] </li></ul> | Password of Postgres database                                      |
| DATABASE_DATABASE      |              | Database name                                           | <ul><li>- [x] </li></ul> | Database mame                                                      |
| DATABASE_SSL           | `true`       | `true` or `false`                                       | <ul><li>- [ ] </li></ul> | Use SSL to connect to database                                     |
| DATABASE_SYNCHRONIZE   | `false`      | `true` or `false`                                       | <ul><li>- [ ] </li></ul> | Synchronize entities to database (shouldn't be used in production) |
| DATABASE_MIGRATIONSRUN | `true`       | `true` or `false`                                       | <ul><li>- [ ] </li></ul> | Run missing migrations on start                                    |
