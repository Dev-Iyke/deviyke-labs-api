import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ContactSubmissionsService } from './contact-submissions.service';
import { CreateContactSubmissionDto } from './dto/create-contact-submission.dto';

@ApiTags('Contact Submissions')
@Controller('contact-submissions')
export class ContactSubmissionsController {
  constructor(
    private readonly contactSubmissionsService: ContactSubmissionsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a contact submission' })
  @ApiCreatedResponse({
    description: 'Contact submission created successfully',
  })
  create(
    @Body()
    payload: CreateContactSubmissionDto,
  ) {
    return this.contactSubmissionsService.create(payload);
  }
}
