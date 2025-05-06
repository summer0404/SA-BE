import { Inject, Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CreateStaffDto } from '../staff/dto/create-staff.dto';
import { UpdateStaffDto } from '../staff/dto/update-staff.dto';
import { createRmqClient } from 'src/config/rmq-client.config';
import { CreatePatientDto } from '../patient/dto/create-patient.dto';
import { ORCHESTRATION_QUEUE, PATIENT_SERVICE } from 'src/common/constant';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrchestrationService {
  constructor(
    @Inject(PATIENT_SERVICE) private readonly patientClient: ClientProxy,
  ) {}

  async createPatient(createPatient: CreatePatientDto, msg: string) {
    try {
      console.log('OrchestrationService - createPatient:', createPatient);
      console.log('OrchestrationService - msg:', msg);
      return await lastValueFrom(this.patientClient.send(msg, createPatient));
    } catch (error) {
      console.log(error);
    }
  }
}
