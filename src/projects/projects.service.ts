import { Injectable, NotFoundException } from "@nestjs/common";
import { Project } from "generated/prisma/client";
import { successResponse } from "src/common/responses/api-response";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const projects = await this.prisma.project.findMany({
      orderBy: [{displayOrder: "asc"}, {createdAt: "desc"}]
    })

    return successResponse(
      "Projects fetched successfully",
      projects.map?.((project) => this.toProjectResponse(project)) 
    )
  }

  async findOneBySlug(slug: string) {
    const project = await this.prisma.project.findUnique({
      where: {slug}
    })

    if(!project){
      throw new NotFoundException("Project not found");
    }

    return successResponse(
      "Project fetched successfully",
      this.toProjectResponse(project)
    )
  }


  private toProjectResponse(project: Project) {
    return {
      slug: project.slug,
      title: project.title,
      kicker: project.kicker,
      summary: project.summary,
      heroImage: project.heroImageSrc
        ? {
            src: project.heroImageSrc,
            alt: project.heroImageAlt,
          }
        : null,
      evidenceStatus: project.evidenceStatus,
      role: project.role,
      timeframe: project.timeframe,
      stack: project.stack,
      impactAreas: project.impactAreas,
      highlights: project.highlights,
      links: project.links,
      caseStudy: {
        problem: project.problem,
        approach: project.approach,
        decisions: project.decisions,
        privacyNote: project.privacyNote,
        nextSteps: project.nextSteps,
        outcome: project.outcome,
        backendNote: project.backendNote,
        challenges: project.challenges,
      },
      featured: project.featured,
      featuredOrder: project.featuredOrder,
      displayOrder: project.displayOrder,
      projectType: project.projectType,
      surfaces: project.surfaces,
      features: project.features,
      outcomes: project.outcomes,
      talkingPoints: project.talkingPoints,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }
}


