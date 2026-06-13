class RecruitmentPage {

    candidateInput() {
        return cy.get('input[placeholder="Type for hints..."]');
    }

    searchButton() {
        return cy.contains("button", "Search");
    }

    resetButton() {
        return cy.contains("button", "Reset");
    }

    addButton() {
        return cy.get('button').contains('Add');
    }

    cancelButton() {
        return cy.contains("button", "Cancel");
    }

}

export default RecruitmentPage;
