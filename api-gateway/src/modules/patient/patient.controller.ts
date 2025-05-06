import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  async create(@Body() dto: CreatePatientDto) {
    const patient = await this.patientService.create(dto);
    return { message: 'Patient created successfully', data: patient };
  }

  @Get()
  async findAll() {
    const staffs = await this.patientService.findAll();
    return { message: 'Patients retrieved successfully', data: staffs };
  }
}
