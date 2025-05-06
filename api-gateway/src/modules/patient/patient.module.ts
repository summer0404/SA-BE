import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { OrchestrationModolue } from 'src/modules/orchestration/orchestration.module';

@Module({
  imports: [OrchestrationModolue],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
