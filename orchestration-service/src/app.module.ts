import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { PatientModule } from './modules/patient/patient.module';

@Module({
  imports: [PatientModule],
})
export class AppModule {}
