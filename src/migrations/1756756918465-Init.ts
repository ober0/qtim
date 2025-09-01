import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1756756918465 implements MigrationInterface {
    name = 'Init1756756918465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "frontend_id" TO "frontendId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_0931de3dc012d9c091a1c5aeda7" UNIQUE ("frontendId")`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "users_frontendId_seq" OWNED BY "users"."frontendId"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "frontendId" SET DEFAULT nextval('"users_frontendId_seq"')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "frontendId" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "users_frontendId_seq"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_0931de3dc012d9c091a1c5aeda7"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "frontendId" TO "frontend_id"`);
    }

}
