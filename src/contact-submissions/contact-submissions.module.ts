import { Module } from '@nestjs/common';
import { ContactSubmissionsController } from 'src/contact-submissions/contact-submissions.controller';
import { ContactSubmissionsService } from 'src/contact-submissions/contact-submissions.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ContactSubmissionsService],
  controllers: [ContactSubmissionsController],
})
export class ContactSubmissionsModule {}
