import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PatientGateway } from './patient.gateway';
import { PatientRegistrationSaga } from './saga/patient-registration.saga';
import { NOTIFICATION_QUEUE, NOTIFICATION_SERVICE, PATIENT_QUEUE, PATIENT_SERVICE } from 'src/common/constant';

@Module({
  imports: [
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
        name: NOTIFICATION_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: NOTIFICATION_QUEUE,
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  providers: [PatientGateway, PatientRegistrationSaga],
})
export class PatientModule {}
