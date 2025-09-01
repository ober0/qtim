import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1756756773464 implements MigrationInterface {
    name = 'Init1756756773464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "password" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cbeb55948781be9257f44febfa0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "persons" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "patronymic" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_74278d8812a049233ce41440ac7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9470b2d663db873a0ad9601f9b" ON "persons" ("first_name", "last_name", "patronymic") `);
        await queryRunner.query(`CREATE INDEX "IDX_f3e74fb7cd895ced38d85bf53a" ON "persons" ("first_name", "patronymic") `);
        await queryRunner.query(`CREATE INDEX "IDX_b5939f4bcec0f4698e908bf310" ON "persons" ("first_name", "last_name") `);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "frontend_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "passwordId" uuid NOT NULL, "personId" uuid NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_93f4fce053c521db024444e928d" UNIQUE ("passwordId"), CONSTRAINT "UQ_ddd0d20e45dbd0d1536dc082039" UNIQUE ("personId"), CONSTRAINT "REL_93f4fce053c521db024444e928" UNIQUE ("passwordId"), CONSTRAINT "REL_ddd0d20e45dbd0d1536dc08203" UNIQUE ("personId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_93f4fce053c521db024444e928d" FOREIGN KEY ("passwordId") REFERENCES "password"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_ddd0d20e45dbd0d1536dc082039" FOREIGN KEY ("personId") REFERENCES "persons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_ddd0d20e45dbd0d1536dc082039"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_93f4fce053c521db024444e928d"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b5939f4bcec0f4698e908bf310"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f3e74fb7cd895ced38d85bf53a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9470b2d663db873a0ad9601f9b"`);
        await queryRunner.query(`DROP TABLE "persons"`);
        await queryRunner.query(`DROP TABLE "password"`);
    }

}
