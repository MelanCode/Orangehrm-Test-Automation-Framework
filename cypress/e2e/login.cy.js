import LoginPage from "../pages/LoginPage";

const loginPage = new LoginPage();

describe("OrangeHRM Login Feature", () => {

    beforeEach(() => {
        cy.visit("/web/index.php/auth/login");
        cy.intercept("POST", "**/auth/validate").as("loginAPI");
    });

    it("Test 01 - Login with valid credentials", () => {

        cy.fixture("users").then((data) => {

            loginPage.login(
                data.validUser.username,
                data.validUser.password
            );

            cy.wait("@loginAPI");

            cy.url()
                .should("include", "dashboard");

            cy.contains("Dashboard")
                .should("be.visible");
        });

    });

    it("Test 02 - Login with invalid username", () => {

        cy.fixture("users").then((data) => {

            loginPage.login(
                "InvalidAdmin",
                data.validUser.password
            );

            cy.wait("@loginAPI");

            loginPage.errorMessage()
                .should("contain", "Invalid credentials");
        });

    });

    it("Test 03 - Login with invalid password", () => {

        cy.fixture("users").then((data) => {

            loginPage.login(
                data.validUser.username,
                "wrongPassword"
            );

            cy.wait("@loginAPI");

            loginPage.errorMessage()
                .should("contain", "Invalid credentials");
        });

    });

    it("Test 04 - Login with invalid username and password", () => {

        loginPage.login(
            "WrongAdmin",
            "WrongPassword"
        );

        cy.wait("@loginAPI");

        loginPage.errorMessage()
            .should("contain", "Invalid credentials");

    });

    it("Test 05 - Login with empty username", () => {

        loginPage.passwordInput()
            .type("admin123");

        loginPage.loginButton()
            .click();

        cy.contains("Required")
            .should("be.visible");

    });

    it("Test 06 - Login with empty password", () => {

        loginPage.usernameInput()
            .type("Admin");

        loginPage.loginButton()
            .click();

        cy.contains("Required")
            .should("be.visible");

    });

    it("Test 07 - Login with empty username and password", () => {

        loginPage.loginButton()
            .click();

        cy.contains("Required")
            .should("be.visible");

    });

    it("Test 08 - Login with uppercase username", () => {

        loginPage.login(
            "ADMINN",
            "admin123"
        );

        cy.wait("@loginAPI");

        loginPage.errorMessage()
            .should("contain", "Invalid credentials");

    });

    it("Test 09 - Login with uppercase password", () => {

        loginPage.login(
            "Admin",
            "ADMIN123"
        );

        cy.wait("@loginAPI");

        loginPage.errorMessage()
            .should("contain", "Invalid credentials");

    });

    it("Test 10 - Verify forgot password navigation", () => {

        cy.contains("Forgot your password?").click();
        cy.url().should("include", "equestPasswordResetCode");
        cy.contains("Reset Password").should("be.visible");

    });

});