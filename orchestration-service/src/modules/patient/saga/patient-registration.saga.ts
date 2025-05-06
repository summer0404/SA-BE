import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { NOTIFICATION_SERVICE, OTP_SEND, PATIENT_CREATE, PATIENT_SERVICE } from "src/common/constant";

@Injectable()
export class PatientRegistrationSaga {
  constructor(
    @Inject(PATIENT_SERVICE) private patientClient: ClientProxy,
    @Inject(NOTIFICATION_SERVICE) private notiClient: ClientProxy,
  ) {}

/* // * LUỒNG ĐĂNG KÝ BỆNH NHÂN MỚI
1. patientClient phát sự kiện CREATE_PATIENT với thông tin bệnh nhân
2. patientService nhận sự kiện CREATE_PATIENT và:
    + Nếu thành công, phát sự kiện CREATE_PATIENT_SUCCESS và trả về patientId và numberPhone 
    + Nếu thất bại, phát sự kiện PATIENT_CREATED_FAIL và trả về lỗi 
3. Nếu nhận sự kiện CREATE_PATIENT_SUCCESS, phát sự kiện SEND_OTP với thông tin bệnh nhân 
    + Nếu thành công, phát sự kiện SEND_OTP_SUCCESS và trả về messgage "Gửi OTP thành công"
    + Nếu thất bại, phát sự kiện SEND_OTP_FAIL và trả về messgage "Xảy ra lỗi trong quá trình gửi OTP. Vui lòng thử lại sau." 
*/ 

  async registration(payload: any) {
    // Emit tạo bệnh nhân
    const msg = PATIENT_CREATE;
    return await lastValueFrom(this.patientClient.send(payload.msg, payload.data));
  }

  async handlePatientCreated(data: any) {
    // Emit gửi OTP
    // this.notiClient.send(OTP_SEND, {
    //   patientId: data.id,
    //   email: data.email,
    //   phone: data.phone,
    // });

    console.log("✅ Đăng ký bệnh nhân thành công:", data);
  }

  async handleOtpSent(data: any) {
    console.log('✅ OTP đã gửi thành công cho', data.email);
  }
}
