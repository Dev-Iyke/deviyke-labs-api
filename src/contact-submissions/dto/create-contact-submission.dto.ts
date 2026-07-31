import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateContactSubmissionDto {
  @ApiProperty({
    example: 'Ada Lovelace',
    description: 'Name of the person submitting the contact form',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(60)
  name!: string;

  @ApiProperty({
    example: 'ada@example.com',
    description: 'Email address where the sender can be reached',
  })
  @IsEmail()
  @MaxLength(100)
  email!: string;

  @ApiPropertyOptional({
    example: 'Collaboration',
    description: 'Optional subject of the message',
  })
  @IsOptional()
  @IsString()
  @MaxLength(60)
  subject?: string;

  @ApiProperty({
    example: 'I saw your NoonPrep case study and would like to discuss a role.',
    description: 'Message from the sender.',
  })
  @IsString()
  @MinLength(10)
  @MaxLength(4000)
  message!: string;
}
