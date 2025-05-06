import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePatientDto } from './dto/create-patient.dto';
import { lastValueFrom } from 'rxjs'; // Để chuyển từ Observable thành Promise
import { createRmqClient } from 'src/config/rmq-client.config';
import {
  PATIENT_CREATE,
  PATIENT_FINDALL,
  PATIENT_QUEUE,
} from 'src/common/constant';
import { OrchestrationService } from '../orchestration/orchestration.service';

@Injectable()
export class PatientService {
  private client: ClientProxy;

  constructor(private readonly orchestrationService: OrchestrationService) {
    this.client = createRmqClient(PATIENT_QUEUE);
  }

  async onModuleInit() {
    await this.client.connect();
  }

  async create(dto: CreatePatientDto) {
    const msg = PATIENT_CREATE;
    return this.orchestrationService.createPatient(dto, msg);
  }

  async findAll() {
    return await lastValueFrom(this.client.send(PATIENT_FINDALL, {}));
  }
}
