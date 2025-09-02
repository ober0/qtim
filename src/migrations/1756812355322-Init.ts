import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1756812355322 implements MigrationInterface {
    name = 'Init1756812355322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" DROP CONSTRAINT "FK_a9c5f4ec6cceb1604b4a3c84c87"`);
        await queryRunner.query(`ALTER TABLE "article" RENAME COLUMN "authorId" TO "author_id"`);
        await queryRunner.query(`CREATE INDEX "IDX_article_author_id" ON "article" ("author_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_article_title" ON "article" ("title") `);
        await queryRunner.query(`ALTER TABLE "article" ADD CONSTRAINT "FK_16d4ce4c84bd9b8562c6f396262" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" DROP CONSTRAINT "FK_16d4ce4c84bd9b8562c6f396262"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_article_title"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_article_author_id"`);
        await queryRunner.query(`ALTER TABLE "article" RENAME COLUMN "author_id" TO "authorId"`);
        await queryRunner.query(`ALTER TABLE "article" ADD CONSTRAINT "FK_a9c5f4ec6cceb1604b4a3c84c87" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
