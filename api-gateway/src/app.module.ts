/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientModule } from './modules/patient/patient.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORCHASTRATION_SERVICE, ORCHESTRATION_QUEUE, PATIENT_QUEUE, PATIENT_SERVICE } from './common/constant';

@Module({
  imports: [
    PatientModule,
    ClientsModule.register([
      {
        name: PATIENT_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: PATIENT_QUEUE,
          queueOptions: { durable: false },
        },
      },
      {
        name: ORCHASTRATION_SERVICE,
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
  providers: [AppService],
})
export class AppModule {}
