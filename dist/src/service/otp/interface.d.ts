import GetMailOTPRequestDTO from "../../dtos/request/otp/GetMailOTPRequestDTO";
import OTPRequestDTO from "../../dtos/request/otp/OTPRequestDTO";
import GetPhoneOTPRequestDTO from "../../dtos/request/otp/GetPhoneOTPRequestDTO";
export interface IOTPSerivce {
    sendMail: (getMailOTPRequestDTO: GetMailOTPRequestDTO) => Promise<any>;
    sendPhone: (getPhonneOTPRequestDTO: GetPhoneOTPRequestDTO) => Promise<any>;
    verify: (OTPRequest: OTPRequestDTO) => Promise<any>;
}
