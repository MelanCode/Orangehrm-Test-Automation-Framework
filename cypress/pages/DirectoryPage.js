class DirectoryPage {

    employeeNameInput() {
        return cy.get('input[placeholder="Type for hints..."]');
    }

    searchButton() {
        return cy.contains("button", "Search");
    }

    resetButton() {
        return cy.contains("button", "Reset");
    }

}

export default DirectoryPage;
