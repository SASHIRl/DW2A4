const Modal = {
    open() {
        //Abrir Modal
        document.querySelector('.modal-overlay').classList.add('active')
        //Adicionar a Class active ao Modal

    },
    close() {
        //Fechar Modal
        document.querySelector('.modal-overlay').classList.remove('active')
        //Remover a Class active do Modal
    }
}

const Storage = {
    get() {
        return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
    },
    set(transactions) {
        localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions))
    }
}

const Transaction = {
    all: Storage.get(),

    add(transaction) {
        Transaction.all.push(transaction)
        App.reload()
    },

    remove(index) {
        Transaction.all.splice(index, 1)
        App.reload()
    },

    incomes() {
        let income = 0;
        //Pega todas as transações e faz a soma.
        Transaction.all.forEach(transaction => {
            if(transaction.amount > 0) {
                income = income + transaction.amount;
            }
        })
        return income;
    },
    expenses() {
        let expense = 0;
        Transaction.all.forEach(transaction => {
            if(transaction.amount < 0) {
                expense = expense + transaction.amount;
            }
        })
        return expense;
    },
    total() {
        return Transaction.incomes() + Transaction.expenses();
    }
}

//Preciso substituir os dados do html com do JS.

const DOM = {
    //Quem coloca os dados é o Javascript.
    transactionsContainer: document.querySelector('#data-table tbody'),
    //Responsável por adicionar transação
    addTransaction(transaction, index) {
        //isso serve para vermos se estamos chegando nesse ponto do código.
        console.log(transaction);
        //Cria um elemento tr através da DOM
        const tr = document.createElement('tr');
        //Recebe 'html' e coloca dentro de tr
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
        tr.dataset.index = index
        //O conteudo de html retornado vai para DOM.innerHTMLTransaction() e daí para tr.innterHTML.
        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction, index) {
        //Se transaction.amout for maior que 0, então use a classe 'income' se não, 'expense'.
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)
        
        //Essa constante 'html' recebe uma constante template literals.
        //Essa constante onde utilizamos `` nos ajuda a colocar variáveis dentro dela.
        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover Transação">
            </td>
        `
        //Return é encessário para jogar para fora do objeto as informações.
        return html;
    },

    updateBalance() {
        document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes())
        document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses())
        document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    }
}

//Faz a formatação dos dados.
const Utils = {
    formatDate(date) {
        const splittedDate = date.split("-")
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },

    formatAmount(value) {
        value = Number(value) * 100
        return value
    },

    formatCurrency(value) {
        const signal = Number(value) <  0 ? "-" : " "
        
        value = String(value).replace(/\D/g, "")

        //Guardamos o número sempre dívidido por 100.
        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
    }
}

//Cria o formulário
const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },
    validateFields() {
        const { description, amount, date } = Form.getValues()
        if(description.trim() === "" || amount.trim() === "" || date.trim() === "") {
            throw new Error("Por favor, preencha todos os campos!")
        }
    },

    formatValues() {
        //a intenção é formatar os valores, por esse motivo não usamos uma constante e sim um 'let' que nos permite formatar os valores.
        let {description, amount, date} = Form.getValues()
        amount = Utils.formatAmount(amount)

        date = Utils.formatDate(date)

        console.log(date)

        return {
            description,
            amount,
            date
        }
    },

    clearFields() {
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },

    submit(event) {
        event.preventDefault()

        try {
            //verificar se as informações foram preenchidas
            Form.validateFields()
            //formatar os dados para salvar
            const transaction = Form.formatValues()
            // Salva os dados do formulário
            Transaction.add(transaction)
            //Apagar os dados do formulário
            Form.clearFields()
            Modal.close()
            App.reload()
        } catch (error) {
            alert(error.message)
        }

        
    }
}

const App = {
    init() {
        
        Transaction.all.forEach(function(transaction, index) {
            DOM.addTransaction(transaction, index)
        })
        
        DOM.updateBalance()
        
        Storage.set(Transaction.all)
    },
    reload() {
        DOM.clearTransactions()
        App.init()
    },
}

App.init()

/*Transaction.add({
    id: 39,
    description: 'alo',
    amount: 200,
    date: '08/04/2022'
})*/