import RecruitmentPage from "../pages/RecruitmentPage";

const recruitmentPage = new RecruitmentPage();

describe("OrangeHRM Recruitment Feature", () => {

    beforeEach(() => {

        cy.login();
        cy.contains("Recruitment").click();
        cy.url().should("include", "recruitment");

    });

    it("Test 01 - Successfully open recruitment page", () => {

        cy.contains("Candidates").should("be.visible");
        cy.url().should("include", "recruitment");

    });

    it("Test 02 - Search candidate by name", () => {

        cy.intercept("GET","**/recruitment/**").as("candidateSearch");

        recruitmentPage.candidateInput().type("John");
        recruitmentPage.searchButton().click();

        cy.wait("@candidateSearch");
        cy.get(".oxd-table-body").should("exist");

    });

    it("Test 03 - Search invalid candidate", () => {

        cy.intercept("GET","**/recruitment/**").as("candidateSearch");

        recruitmentPage.candidateInput().type("XYZ123ABC");
        recruitmentPage.searchButton().click();

        cy.wait("@candidateSearch");
        cy.contains("Invalid").should("be.visible");

    });

    it("Test 04 - Search with empty candidate field", () => {

        cy.intercept("GET","**/recruitment/**").as("candidateSearch");

        recruitmentPage.searchButton().click();
        cy.wait("@candidateSearch");
        cy.url().should("include", "recruitment");

    });

    it("Test 05 - Reset candidate filter", () => {

        recruitmentPage.candidateInput().type("Peter");
        recruitmentPage.resetButton().click();
        recruitmentPage.candidateInput().should("have.value", "Peter");

    });

    it("Test 06 - Verify search button", () => {

        recruitmentPage.searchButton().should("be.visible").and("not.be.disabled");

    });

    it("Test 07 - Verify reset button", () => {

        recruitmentPage.resetButton().should("be.visible").and("not.be.disabled");

    });

    it("Test 08 - Open add candidate form", () => {

        recruitmentPage.addButton().click();
        cy.contains("Add Candidate").should("be.visible");
        cy.url().should("include", "addCandidate");

    });

    it("Test 09 - Verify add candidate form fields", () => {

        recruitmentPage.addButton().click();
        cy.contains("Add Candidate").should("be.visible");
        cy.get('input[name="firstName"]').should("be.visible");
        cy.get('input[name="lastName"]').should("be.visible");
        cy.get('input[placeholder="Type here"]').first().should("be.visible");

    });

    it("Test 10 - Cancel add candidate", () => {

        recruitmentPage.addButton().click();
        cy.contains("Add Candidate").should("be.visible");
        cy.contains("button", "Cancel").click();
        cy.url().should("include", "recruitment");

    });

});