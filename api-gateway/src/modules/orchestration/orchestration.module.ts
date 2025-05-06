import { Module } from '@nestjs/common';
import { OrchestrationService } from './orchestration.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PATIENT_QUEUE, PATIENT_SERVICE } from 'src/common/constant';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PATIENT_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'], // địa chỉ RabbitMQ
          queue: PATIENT_QUEUE, // tên queue
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  providers: [OrchestrationService],
  exports: [OrchestrationService],
})
export class OrchestrationModolue {}
