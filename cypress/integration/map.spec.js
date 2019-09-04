import { cyan } from "ansi-colors";

describe('Start Input', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/map')
    })
    
    it('focuses start input on load', () => {

        cy.focused()
            .should('have.id', 'start')
    })

    it('accepts input', () => {
        const typedText = 'Route up'

        cy.get('#start')
            .type(typedText)
            .should('have.value', typedText)
        
        cy.get('#end')
            .type(typedText)
            .should('have.value', typedText)
    })
})