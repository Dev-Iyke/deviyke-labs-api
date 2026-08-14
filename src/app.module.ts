import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactSubmissionsModule } from 'src/contact-submissions/contact-submissions.module';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ContactSubmissionsModule,
    ProjectsModule
  ],
  controllers: [AppController], // Controllers are registered here so that they can handle incoming requests and return responses
  providers: [AppService], // Services are registered here so that they can be injected into controllers and other services
})
export class AppModule {}
