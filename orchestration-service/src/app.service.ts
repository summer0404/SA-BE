import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('ORCHESTRATOR_RMQ_CLIENT') private readonly client: ClientProxy,
  ) {}

  // Nhận request từ ApiGateway và thực hiện các bước saga
  async createPatientWithRecord(createPatientDto: any) {
    // Tạo bệnh nhân thông qua API call tới microservice khác (ví dụ: PatientService)
    const patient = await this.client
      .send('create_patient', createPatientDto);

    // Thực hiện các bước tiếp theo của saga nếu cần
    return { patient };
  }
}
