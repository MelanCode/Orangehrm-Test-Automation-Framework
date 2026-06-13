class LoginPage {

    usernameInput() {
        return cy.get('input[name="username"]');
    }

    passwordInput() {
        return cy.get('input[name="password"]');
    }

    loginButton() {
        return cy.get('button[type="submit"]');
    }

    errorMessage() {
        return cy.get(".oxd-alert-content-text");
    }

    login(username, password) {

        this.usernameInput()
            .clear()
            .type(username);

        this.passwordInput()
            .clear()
            .type(password);

        this.loginButton()
            .click();
    }

}

export default LoginPage;
