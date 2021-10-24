import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1635079468002 implements MigrationInterface {
    name = 'Init1635079468002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "api_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying NOT NULL, "user_id" uuid NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d862311c568d175c26f41bc6f98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "invites" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_aa52e96b44a714372f4dd31a0af" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "updates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "filename" character varying NOT NULL, "url" character varying NOT NULL, "timestamp" bigint NOT NULL, "version" character varying NOT NULL, "size" bigint NOT NULL, "type" character varying NOT NULL, "percentage" smallint NOT NULL, "staged_id" character varying NOT NULL, "allowed_count" bigint NOT NULL DEFAULT '0', "denied_count" bigint NOT NULL DEFAULT '0', "codename" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6029912acac4189b62b8b57c880" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "devices" ("codename" character varying NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_701469ffc66ae845f01103e71eb" PRIMARY KEY ("codename"))`);
        await queryRunner.query(`ALTER TABLE "api_token" ADD CONSTRAINT "FK_1725c5ea908ff009f6ab3fa34fd" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "updates" ADD CONSTRAINT "FK_895cc50265b04c871ed58c4f63c" FOREIGN KEY ("codename") REFERENCES "devices"("codename") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "updates" DROP CONSTRAINT "FK_895cc50265b04c871ed58c4f63c"`);
        await queryRunner.query(`ALTER TABLE "api_token" DROP CONSTRAINT "FK_1725c5ea908ff009f6ab3fa34fd"`);
        await queryRunner.query(`DROP TABLE "devices"`);
        await queryRunner.query(`DROP TABLE "updates"`);
        await queryRunner.query(`DROP TABLE "invites"`);
        await queryRunner.query(`DROP TABLE "api_token"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
