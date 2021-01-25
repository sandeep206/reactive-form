import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { validationMessages } from './app-validator';

const appServiceSpy = jasmine.createSpyObj<AppService>('AppService', [
    'postUser'
]);

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [AppComponent],
            providers: [{ provide: AppService, useValue: appServiceSpy }]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    }));

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('form should be invalid when empty', () => {
        expect(component.loginForm.invalid).toBeTruthy();
    });

    it('form should be valid on entering required fields', () => {
        component.firstName.setValue('Thomas');
        component.lastName.setValue('Shelby');
        component.email.setValue('thomas@shelby.co.uk');
        component.password.setValue('PeakyBlinders');

        expect(component.loginForm.valid).toBeTruthy();
    });

    describe('#firstName', () => {
        let firstName: AbstractControl;

        beforeEach(() => {
            firstName = component.loginForm.get('firstName');
        });

        it('should be invalid if empty', () => {
            expect(firstName.invalid).toBeTruthy();
        });

        it('should be a "required" field', () => {
            const required = validationMessages.firstName.type;
            expect(firstName.errors[required]).toBeTruthy();
        });

        it('should be valid if some value is present', () => {
            firstName.setValue('John');
            expect(firstName.valid).toBeTruthy();
        });
    });

    describe('#lastName', () => {
        let lastName: AbstractControl;

        beforeEach(() => {
            lastName = component.loginForm.get('lastName');
        });

        it('should be invalid if empty', () => {
            expect(lastName.invalid).toBeTruthy();
        });

        it('should be a "required" field', () => {
            const required = validationMessages.lastName.type;
            expect(lastName.errors[required]).toBeTruthy();
        });

        it('should be valid if some value is present', () => {
            lastName.setValue('Doe');
            expect(lastName.valid).toBeTruthy();
        });
    });

    describe('#email', () => {
        let email: AbstractControl;

        beforeEach(() => {
            email = component.loginForm.get('email');
        });

        it('should be invalid if empty', () => {
            expect(email.invalid).toBeTruthy();
        });

        it('should be a "required" field', () => {
            const required = validationMessages.email[0].type;
            expect(email.errors[required]).toBeTruthy();
        });

        it('should have correct "pattern"', () => {
            email.setValue('john.com');
            const errorPattern = email.errors[validationMessages.email[1].type];
            expect(errorPattern).toBeTruthy();
            expect(email.valid).toBeFalsy();

            email.setValue('john@doe.com');
            expect(email.errors).toBeFalsy();
            expect(email.valid).toBeTruthy();
        });
    });

    describe('#password', () => {
        let password: AbstractControl;

        beforeEach(() => {
            password = component.loginForm.get('password');
        });

        it('should be invalid if empty', () => {
            expect(password.invalid).toBeTruthy();
        });

        it('should be a "required" field', () => {
            const required = validationMessages.password[0].type;
            password.setValue(null);
            expect(password.errors[required]).toBeTruthy();
        });

        it('should be "8 characters long"', () => {
            const minLength = validationMessages.password[1].type;
            password.setValue('john');
            expect(password.errors[minLength]).toBeTruthy();
            expect(password.valid).toBeFalsy();

            password.setValue('Qwertyqw');
            expect(password.errors).toBeFalsy();
            expect(password.valid).toBeTruthy();
        });

        it('should have "upper and lower case" characters', () => {
            password.setValue('qwertyqw');
            const errorPattern =
                password.errors[validationMessages.password[2].type];

            expect(errorPattern).toBeTruthy();
            expect(password.valid).toBeFalsy();

            password.setValue('Qwertyqw');
            expect(password.errors).toBeFalsy();
            expect(password.valid).toBeTruthy();
        });

        it(`should not contain "user's first or last name"`, () => {
            const loginForm = component.loginForm;
            const firstName: AbstractControl = loginForm.get('firstName');
            const lastName: AbstractControl = loginForm.get('lastName');
            const email: AbstractControl = loginForm.get('email');

            firstName.setValue('John');
            lastName.setValue('Doe');
            email.setValue('john@doe.com');
            password.setValue('John');

            const errorPattern =
                loginForm.errors[validationMessages.password[3].type];

            expect(errorPattern).toBeTruthy();
            expect(loginForm.valid).toBeFalsy();

            password.setValue('Qwertyqw');
            expect(password.errors).toBeFalsy();
            expect(loginForm.valid).toBeTruthy();
        });
    });
});
