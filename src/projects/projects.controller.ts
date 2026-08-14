import { Controller, Get, Param } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ProjectsService } from "src/projects/projects.service";

@ApiTags("Projects")
@Controller("projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService){}

  @Get()
  @ApiOperation({summary: "Get all projects"})
  findAll(){
    return this.projectsService.findAll()
  }

  @Get(":slug")
  @ApiOperation({summary: "Get a project by slug"})
  findOneBySlug(
    @Param("slug") slug: string
  ){
    return this.projectsService.findOneBySlug(slug)
  }
}