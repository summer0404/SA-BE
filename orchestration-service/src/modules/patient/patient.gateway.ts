import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { PatientRegistrationSaga } from './saga/patient-registration.saga';
import { PATIENT_CREATE, PATIENT_CREATE_SUCCESS, PATIENT_SEND_OTP_SUCCESS } from 'src/common/constant';
import { CreatePatientDto } from './dto/create-patient.dto';

@Controller()
export class PatientGateway {
  constructor(private readonly saga: PatientRegistrationSaga) {}

  @MessagePattern(PATIENT_CREATE)
  handleRegisterPatient(@Payload() payload: any) {
    console.log('Received patient registration request:', payload.data);
    return this.saga.registration(payload);
  }
}
