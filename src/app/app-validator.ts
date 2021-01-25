import { FormGroup, ValidatorFn } from '@angular/forms';
import { FormValidationMessage } from './model/form-validation-message';

export const validationMessages: FormValidationMessage = {
    firstName: { type: 'required', message: 'First Name is required' },
    lastName: { type: 'required', message: 'Last Name is required' },
    email: [
        { type: 'required', message: 'Email is required' },
        {
            type: 'pattern',
            message: 'Enter a valid email'
        }
    ],
    password: [
        { type: 'required', message: 'Password is required' },
        {
            type: 'minlength',
            message: 'Password must be at least 8 characters long'
        },
        {
            type: 'pattern',
            message: 'Password must contain lower and uppercase letters'
        },
        {
            type: 'invalidPassword',
            message: 'Password contains first or last name'
        }
    ]
};

export const validatePassword = (): ValidatorFn => {
    return (formGroup: FormGroup): { [key: string]: boolean } => {
        const firstName = formGroup.get('firstName').value;
        const lastName = formGroup.get('lastName').value;
        const password = formGroup.get('password').value;

        if (firstName !== '' || lastName !== '' || password !== '') {
            return [firstName, lastName].includes(password)
                ? { invalidPassword: true }
                : undefined;
        }
        return undefined;
    };
};
