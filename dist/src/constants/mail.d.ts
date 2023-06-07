import OptionMailTemplateDTO from "../dtos/request/mail/OptionMailTemplateDTO";
declare const MAIL_TEMPLATE: {
    OTP_TEMPLATE: (otp: any) => OptionMailTemplateDTO;
    VERIFY_EMAIL_TEMPLATE: (token: any) => OptionMailTemplateDTO;
};
export default MAIL_TEMPLATE;
