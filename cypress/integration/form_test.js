describe('Test our form inputs', function () {
    this.beforeEach(function () {
        cy.visit('http://localhost:3000/')
    })
    
    it('first test', function () {
        
        cy.get('[data-cy="name"]')
            .type("Dom")
            .should("have.value", "Dom")
            .should("not.have.value", "");
        cy.get('[data-cy="email"]')
            .type("dmnqgrrtt@gmail.com")
            .should("have.value", "dmnqgrrtt@gmail.com")
            .should("not.have.value", "");
        cy.get('[data-cy="password"]')
            .type('Go Bucs')
            .should("have.value", "Go Bucs")
            .should("not.have.value", "");
        cy.get('[type="checkbox"]')
            .check()
            .should('be.checked');  
        cy.get('button')
            .should('be.disabled');      

    });
});