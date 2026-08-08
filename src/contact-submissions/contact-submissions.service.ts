import { Injectable } from '@nestjs/common';
import { CreateContactSubmissionDto } from '../contact-submissions/dto/create-contact-submission.dto';
import { PrismaService } from '../prisma/prisma.service';
import { successResponse } from 'src/common/responses/api-response';

@Injectable()
export class ContactSubmissionsService {
  constructor(private readonly prisma: PrismaService) {}

  //Normal Method to create the submission
  async create(data: CreateContactSubmissionDto) {
    const submission = await this.prisma.contactSubmission.create({
      data,
    });

    return successResponse('Contact submission received', {
      id: submission.id,
      createdAt: submission.createdAt,
    });
  }
}
