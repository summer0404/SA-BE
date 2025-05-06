import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PATIENT_CREATE, PATIENT_FINDALL } from 'common/constant';

@Controller()
export class AppController {
  constructor(private readonly patientService: AppService) {}

  @MessagePattern(PATIENT_CREATE)
  async handlePatientCreated(@Payload() payload: CreatePatientDto) {
    console.log('Creating patient:', payload);
    return await this.patientService.create(payload);
  }

  @MessagePattern(PATIENT_FINDALL)
  async getAllPatient() {
    console.log('Fetching all patients:');
    return await this.patientService.findAll();
  }
}
