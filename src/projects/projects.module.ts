import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { ProjectsController } from "src/projects/projects.controller";
import { ProjectsService } from "src/projects/projects.service";

@Module({
  imports: [PrismaModule],
  providers: [ProjectsService],
  controllers: [ProjectsController]
})
export class ProjectsModule {}