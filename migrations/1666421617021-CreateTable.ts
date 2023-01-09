import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTable1666421617021 implements MigrationInterface {
    name = 'CreateTable1666421617021'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "majors" ("id" SERIAL NOT NULL, "major" character varying NOT NULL, "code" integer NOT NULL, "university" character varying NOT NULL, "educationCourse" character varying NOT NULL, "order" SERIAL NOT NULL, "userId" integer, CONSTRAINT "PK_9d82cf80fe0593040e50ccb297e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "gmail" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_97429b42372c6d841a8fc0ad871" UNIQUE ("gmail"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "majors" ADD CONSTRAINT "FK_a9eb81804d2f7c22de2a6700127" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "majors" DROP CONSTRAINT "FK_a9eb81804d2f7c22de2a6700127"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "majors"`);
    }

}
