describe('Validate Tests', () =>{

    it('Deve verificar caixa de opções',()=>{
        cy.visit('https://sashirl.github.io/DW2A4/Atividades/A5/index')

        cy.get('#nome').type('Diego Marques da Costa')
        cy.get('#cpf').type('40635238462')
        cy.get('#dt_nasc').type('16061993')
        //cy.get('#email').type('a')
        cy.get('#fone').type('11987014256')
        cy.get('#cep').type('08630730')
        cy.get('#pis').type('12345678910')
        
    })
})