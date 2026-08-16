import { ApiProperty } from "@nestjs/swagger";
import { IsBooleanString, IsOptional } from "class-validator";

export class FindProjectsQueryDto {
  @ApiProperty({
    description: "Filter projects by featured status",
    enum: ["true", "false"]
  })
  @IsOptional()
  @IsBooleanString()
  featured?: string;
}