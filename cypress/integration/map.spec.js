import { cyan } from "ansi-colors";
//Local host imput 
describe('Start Input', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/map')
    })
 
    it('focuses start input on load', () => {

        cy.focused()
            .should('have.id', 'start')
    })

    it('accepts input', () => {
        const typedText = 'Detroit'
       
        cy.get('#start')
            .type(typedText)
            .should('have.value', typedText)

        const typeText = 'Miami'

        cy.get('#end')
            .type(typeText)
            .should('have.value', typeText)

            
        cy.get('#button').click() 
        
  
            })
   
//hey Nav

//Needs Autofocus in "Add a vehicle ID" for test to pass 
    // it('focuses start input on load', () => {

    //     cy.focused()
    //         .should('have.id', 'selected')
    // })
//Needs Autofocus in "Add a vehicle ID" for test to pass 
    // it('focuses start input on load', () => {

    //     cy.focused()
    //         .should('have.id', 'sidebar-tab')
    // })

})
