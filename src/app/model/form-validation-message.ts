interface FormMessageType {
    type: string;
    message: string;
}

export interface FormValidationMessage {
    firstName: FormMessageType;
    lastName: FormMessageType;
    email: FormMessageType[];
    password: FormMessageType[];
}
