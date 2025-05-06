import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from 'database/entities/patient.entity';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { PatientRepository } from './repository/patient.repository';
import { DatabaseModule } from 'database/database.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  ORCHESTRATION_QUEUE,
  ORCHESTRATION_SERVICE,
  PATIENT_REPOSITORY,
} from 'common/constant';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Patient]),
    ClientsModule.register([
      {
        name: ORCHESTRATION_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: ORCHESTRATION_QUEUE,
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: PATIENT_REPOSITORY,
      useClass: PatientRepository,
    },
  ],
})
export class AppModule {}
