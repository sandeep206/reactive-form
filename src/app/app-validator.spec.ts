import { FormControl, FormGroup } from '@angular/forms';
import { validatePassword } from './app-validator';

describe('validatePassword', () => {
    let passwordValidator;
    let testForm;
    let firstName;
    let lastName;
    let password;

    beforeEach(() => {
        passwordValidator = validatePassword();
        testForm = new FormGroup({
            firstName: new FormControl(),
            lastName: new FormControl(),
            password: new FormControl()
        });

        firstName = testForm.get('firstName');
        lastName = testForm.get('lastName');
        password = testForm.get('password');
    });

    it('should return "invalid password" for reusing firstname or lastname', () => {
        firstName.setValue('John');
        lastName.setValue('Doe');
        password.setValue('John');
        expect(passwordValidator(testForm)).toEqual({
            invalidPassword: true
        });
    });

    it('should return "undefined" for giving distinct password from firstname or lastname', () => {
        firstName.setValue('John');
        lastName.setValue('Doe');
        password.setValue('PeakyBlinders');
        expect(passwordValidator(testForm)).toEqual(undefined);
    });
});
