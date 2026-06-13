import DirectoryPage from "../pages/DirectoryPage";

const directoryPage = new DirectoryPage();

describe("OrangeHRM - Directory Feature", () => {

    beforeEach(() => {

        cy.login();
        cy.contains("Directory").click();
        cy.url().should("include", "/directory");

    });

    it("Test 01 - Verify user can open Directory page", () => {

        cy.contains("Directory").should("be.visible");
        cy.contains("Employee Name").should("be.visible");

    });

    it("Test 02 - Verify employee autocomplete works", () => {

        directoryPage.employeeNameInput().type("Pe");
        cy.get(".oxd-autocomplete-dropdown", {timeout: 10000}).should("be.visible");
        cy.get(".oxd-autocomplete-option").should("have.length.greaterThan", 0);

    });

    it("Test 03 - Search invalid candidate", () => {

        directoryPage.employeeNameInput().type("XYZ123ABC");
        directoryPage.searchButton().click();
        cy.contains("No Records Found").should("be.visible");

    });

    it("Test 04 - Search without employee name", () => {

        cy.intercept("GET","**/directory/**").as("emptySearch");
        directoryPage.searchButton().click();
        cy.wait("@emptySearch");
        cy.url().should("include", "directory");

    });

    it("Test 05 - Reset employee search field", () => {

        directoryPage.employeeNameInput().type("Linda");
        directoryPage.resetButton().click();
        directoryPage.employeeNameInput().should("have.value", "Linda");

    });

    it("Test 06 - Verify Search button", () => {

        directoryPage.searchButton().should("be.visible").and("not.be.disabled");

    });

    it("Test 07 - Verify Reset button", () => {

        directoryPage.resetButton().should("be.visible").and("not.be.disabled");

    });

    it("Test 08 - Verify employee name input field", () => {

        directoryPage.employeeNameInput().should("be.visible");
        directoryPage.employeeNameInput().type("Admin");
        directoryPage.employeeNameInput().should("have.value", "Admin");

    });

    it("Test 09 - Verify employee autocomplete suggestion", () => {

        cy.intercept("GET","**/directory/**").as("autocomplete");

        directoryPage.employeeNameInput().type("Lin");

        cy.wait("@autocomplete");

        cy.get(".oxd-autocomplete-dropdown").should("be.visible");

    });

    it("Test 10 - Verify employee cards are displayed", () => {

        cy.intercept("GET","**/directory/**").as("directoryLoad");

        cy.wait("@directoryLoad");

        cy.get(".orangehrm-directory-card")
            .should("exist");

    });

});