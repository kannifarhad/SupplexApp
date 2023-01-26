/*
  Warnings:

  - Added the required column `location` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('COMPLETED', 'CANCELLED', 'PENDING', 'ONHOLD');

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "sochialNetworks" JSONB NOT NULL DEFAULT '[]';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "address" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "photo" TEXT;

-- CreateTable
CREATE TABLE "Payments" (
    "id" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT E'PENDING',
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentDate" TIMESTAMP(3),

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);
