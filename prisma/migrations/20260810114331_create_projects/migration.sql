-- CreateEnum
CREATE TYPE "ProjectEvidenceStatus" AS ENUM ('SHIPPED', 'ACTIVE_BUILD', 'EXPERIMENT');

-- CreateEnum
CREATE TYPE "ProjectImpactArea" AS ENUM ('FRONTEND_ARCHITECTURE', 'PRODUCT_INTERFACE', 'BACKEND_FOUNDATION', 'WORKFLOW_DESIGN', 'PERFORMANCE_ACCESSIBILITY');

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "kicker" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "heroImageSrc" TEXT,
    "heroImageAlt" TEXT,
    "evidenceStatus" "ProjectEvidenceStatus" NOT NULL,
    "role" TEXT NOT NULL,
    "timeframe" TEXT NOT NULL,
    "projectType" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "featuredOrder" INTEGER,
    "displayOrder" INTEGER,
    "stack" JSONB NOT NULL,
    "impactAreas" "ProjectImpactArea"[],
    "highlights" JSONB NOT NULL,
    "links" JSONB NOT NULL,
    "surfaces" JSONB NOT NULL,
    "features" JSONB NOT NULL,
    "outcomes" JSONB NOT NULL,
    "talkingPoints" JSONB NOT NULL,
    "problem" TEXT NOT NULL,
    "approach" TEXT NOT NULL,
    "outcome" TEXT,
    "backendNote" TEXT,
    "privacyNote" TEXT NOT NULL,
    "decisions" JSONB NOT NULL,
    "challenges" JSONB NOT NULL,
    "nextSteps" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

ALTER TABLE public."Project" ENABLE ROW LEVEL SECURITY;

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE INDEX "Project_featured_featuredOrder_idx" ON "Project"("featured", "featuredOrder");

-- CreateIndex
CREATE INDEX "Project_displayOrder_idx" ON "Project"("displayOrder");

-- CreateIndex
CREATE INDEX "Project_evidenceStatus_idx" ON "Project"("evidenceStatus");
