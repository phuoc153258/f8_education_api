import OptionMailTemplateDTO from "./OptionMailTemplateDTO";
export default class SendMailRequestDTO {
    email?: string;
    options?: OptionMailTemplateDTO;
    constructor({ email, options }: {
        email: any;
        options: any;
    });
}
