describe('Validate Tests', () =>{

    it('Deve criar e remover transações',()=>{
        cy.visit('https://sashirl.github.io/DW2A4/Atividades/A3/index#')
        cy.get('#transaction > .button').click()
        cy.get('#description').type('Livros')
        cy.get('#amount').type('1000')
        cy.get('#date').type('1993-06-16')
        cy.get('button').click()

        cy.get('.description').should('be.visible').and('contain', 'Livros')

        cy.get('#transaction > .button').click()
        cy.get('#description').type('Jogos')
        cy.get('#amount').type('800')
        cy.get('#date').type('2022-08-01')
        cy.get('button').click()

        cy.get('#transaction > .button').click()
        cy.get('#description').type('Trabalho')
        cy.get('#amount').type('500')
        cy.get('#date').type('2022-08-01')
        cy.get('button').click()

        cy.get('#transaction > .button').click()
        cy.get('#description').type('Conta de Luz')
        cy.get('#amount').type('400')
        cy.get('#date').type('2022-08-01')
        cy.get('button').click()

        cy.get('#transaction > .button').click()
        cy.get('#description').type('Conta de água')
        cy.get('#amount').type('200')
        cy.get('#date').type('2022-08-01')
        cy.get('button').click()

        cy.get('#transaction > .button').click()
        cy.get('#description').type('Internet')
        cy.get('#amount').type('80')
        cy.get('#date').type('2022-08-01')
        cy.get('button').click()

        cy.get('[data-index="5"] > :nth-child(4) > img').click()
        cy.get('[data-index="4"] > :nth-child(4) > img').click()
        cy.get('[data-index="3"] > :nth-child(4) > img').click()
        cy.get('[data-index="2"] > :nth-child(4) > img').click()
        cy.get('[data-index="1"] > :nth-child(4) > img').click()
        cy.get('[data-index="0"] > :nth-child(4) > img').click()
    })

    it('Deve clicar em "Nova Transação" e em "Cancelar"',()=>{
        cy.visit('https://sashirl.github.io/DW2A4/Atividades/A3/index#')

        cy.get('#transaction > .button').click
        cy.get('.actions > .button').click
    })
})