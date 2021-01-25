/// <reference types="cypress" />

describe('Login form', () => {
    const firstName = 'Thomas';
    const lastName = 'Shelby';
    const email = 'thomas@shelby.com';
    const password = 'Peakyyyy';

    beforeEach(() => {
        cy.visit('http://localhost:4200');
    });

    it('should display form title', () => {
        cy.get('h3').should('contain', 'Login Form');
    });

    it('first name should display required error message', () => {
        cy.get('#firstName').trigger('focus').trigger('blur');
        cy.get('div.field--error').should('be.visible');
        cy.contains('First Name is required');
    });

    it('last name should display required error message', () => {
        cy.get('#lastName').trigger('focus').trigger('blur');
        cy.get('div.field--error').should('be.visible');
        cy.contains('Last Name is required');
    });

    it('email should display required error message', () => {
        cy.get('#email').trigger('focus').trigger('blur');
        cy.get('div.field--error').should('be.visible');
        cy.contains('Email is required');
    });

    it('email should display valid error message', () => {
        cy.get('#email').type('test.test.com').trigger('blur');
        cy.get('div.field--error').should('be.visible');
        cy.contains('Enter a valid email');
    });

    it('passoword should display required error message', () => {
        cy.get('#password').trigger('focus').trigger('blur');
        cy.get('div.field--error').should('be.visible');
        cy.contains('Password is required');
    });

    it('passoword should display min length error message', () => {
        cy.get('#password').type('Test').trigger('blur');
        cy.get('div.field--error').should('be.visible');
        cy.contains('Password must be at least 8 characters long');
    });

    it('passoword should display case sensitive error message', () => {
        cy.get('#password').type('test').trigger('blur');
        cy.get('div.field--error').should('be.visible');
        cy.contains('Password must contain lower and uppercase letters');
    });

    it('passoword should display weak password error message', () => {
        cy.get('#firstName').type('Thomas').trigger('blur');
        cy.get('#password').type('Thomas').trigger('blur');
        cy.get('div.field--error').should('be.visible');
        cy.contains('Password contains first or last name');
    });

    it('submit button should be disabled for invalid form', () => {
        cy.get('#firstName').trigger('focus').trigger('blur');
        cy.get('div.field--error').should('be.visible');
        cy.contains('First Name is required');
        cy.get('input[type=submit]').should('be.disabled');
    });

    it('submit button should be enabled for valid form', () => {
        cy.get('#firstName').type(firstName);
        cy.get('#lastName').type(lastName);
        cy.get('#email').type(email);
        cy.get('#password').type(password).trigger('blur');
        cy.get('input[type=submit]')
            .should('be.enabled')
            .click()
            .then(() => {
                cy.get('p.field--success')
                    .should('be.visible')
                    .contains('Successfully registered the user!');
            });
    });
});
