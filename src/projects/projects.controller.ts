import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { FindProjectsQueryDto } from "src/projects/dto/find-projects-query.dto";
import { ProjectsService } from "src/projects/projects.service";

@ApiTags("Projects")
@Controller("projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService){}

  @Get()
  @ApiOperation({summary: "Get all projects"})
  findAll(@Query() query: FindProjectsQueryDto){
    return this.projectsService.findAll(query)
  }

  @Get(":slug")
  @ApiOperation({summary: "Get a project by slug"})
  findOneBySlug(
    @Param("slug") slug: string
  ){
    return this.projectsService.findOneBySlug(slug)
  }
}