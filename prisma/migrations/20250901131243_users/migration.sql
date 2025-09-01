-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "users";

-- CreateTable
CREATE TABLE "users"."passwords" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "frontend_id" SERIAL NOT NULL,

    CONSTRAINT "passwords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"."persons" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "patronymic" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "frontend_id" SERIAL NOT NULL,

    CONSTRAINT "persons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"."users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "frontend_id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "passwordId" TEXT NOT NULL,
    "personId" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "persons_first_name_last_name_idx" ON "users"."persons"("first_name", "last_name");

-- CreateIndex
CREATE INDEX "persons_first_name_patronymic_idx" ON "users"."persons"("first_name", "patronymic");

-- CreateIndex
CREATE INDEX "persons_first_name_last_name_patronymic_idx" ON "users"."persons"("first_name", "last_name", "patronymic");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"."users"("email");

-- AddForeignKey
ALTER TABLE "users"."users" ADD CONSTRAINT "users_passwordId_fkey" FOREIGN KEY ("passwordId") REFERENCES "users"."passwords"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."users" ADD CONSTRAINT "users_personId_fkey" FOREIGN KEY ("personId") REFERENCES "users"."persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
