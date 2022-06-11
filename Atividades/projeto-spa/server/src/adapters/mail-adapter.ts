export interface SendMailData {
    subjetc: string;
    body: string;
}

export interface MailAdapter {
    sendMail: (data: SendMailData) => Promisse<void>;
}