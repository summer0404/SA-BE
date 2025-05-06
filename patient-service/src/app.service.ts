import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Patient } from 'database/entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientStatus } from 'common/enums';
import { IPatientsRepository } from './repository/patient.repository.interface';
import { ORCHESTRATION_QUEUE, PATIENT_REPOSITORY } from 'common/constant';
import { ClientProxy } from '@nestjs/microservices';
import { createRmqClient } from 'common/config/rmq-client.config';

@Injectable()
export class AppService {
  private client: ClientProxy;

  constructor(
    @Inject(PATIENT_REPOSITORY)
    private readonly patientRepository: IPatientsRepository,
  ) {
    this.client = createRmqClient(ORCHESTRATION_QUEUE)
  }

  async create(createDto: CreatePatientDto): Promise<Patient> {
    const patient = this.patientRepository.create(createDto);
    return this.patientRepository.save(patient);
  }

  async findAll(): Promise<Patient[]> {
    return this.patientRepository.find();
  }
}
