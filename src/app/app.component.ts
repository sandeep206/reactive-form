import { Component } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { User } from './model/user';
import { AppService } from './app.service';
import * as AppValidator from './app-validator';
import { FormValidationMessage } from './model/form-validation-message';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private appService: AppService) {}

    public isUserRegistered = false;
    public validationMessages: FormValidationMessage =
        AppValidator.validationMessages;

    public loginForm = new FormGroup(
        {
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            email: new FormControl(
                '',
                Validators.compose([
                    Validators.required,
                    Validators.pattern(
                        '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
                    )
                ])
            ),
            password: new FormControl(
                '',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(8),
                    Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]+$')
                ])
            )
        },
        {
            validators: [AppValidator.validatePassword()],
            updateOn: 'blur'
        }
    );

    public onSubmit(): void {
        if (!this.loginForm.valid) {
            return null;
        }
        const user: User = this.loginForm.value;
        this.appService.postUser(user).subscribe((responseUser: User) => {
            this.isUserRegistered = true;
            console.log(`${responseUser} is succesfully registered`);
        });
    }

    public get firstName(): AbstractControl {
        return this.loginForm.get('firstName');
    }
    public get lastName(): AbstractControl {
        return this.loginForm.get('lastName');
    }
    public get email(): AbstractControl {
        return this.loginForm.get('email');
    }
    public get password(): AbstractControl {
        return this.loginForm.get('password');
    }
}
