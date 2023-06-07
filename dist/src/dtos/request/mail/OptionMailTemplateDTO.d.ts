export default class OptionMailTemplateDTO {
    subject?: string;
    html?: string;
    constructor({ subject, html }: {
        subject: any;
        html: any;
    });
}
