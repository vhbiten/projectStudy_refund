const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

const expenseList = document.querySelector("ul")
const expensesQuantity = document.querySelector("aside header p span")

amount.oninput = () => {
    let value = amount.value.replace(/\D/g, "") //remove as letras do input

    value = Number(value) / 100 //valor em centavos
    amount.value = formatCurrencyBRL(value) //aplica o replace no input
}

function formatCurrencyBRL(value) {
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        })
        return value
        //coloca o valor em formato BRL de currency
}

//captura o submit do formulario e armazena as informações criando um novo objeto com os detalhes da despeza
form.onsubmit = (event) => {
    event.preventDefault()
    
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }
    //chama a função que irá adicionar o item na lista de despezas
    ExpenseAdd(newExpense)
}

function ExpenseAdd(newExpense) {
    
    try {
        //cria os elementos li para adicionar na lista
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        //cria a imagem da categoria
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        //nome da despesa e categoria (texto)
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        //cria o valor da despesa
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

        expenseInfo.append(expenseName, expenseCategory)

        //cria o icone de remover
        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src", "img/remove.svg")
        removeIcon.setAttribute("alt", "remover")

        //adiciona informações no item
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

        //adiciona o item na lista
        expenseList.append(expenseItem)

        updateTotals()
    //se der error cai no catch
    } catch (error){
        alert("Não foi possível atualizar a lista de despezas.")
        console.log(error)
    }
}


//atualiza os totais
function updateTotals() {
    try {
        //recupera os itens da li
        const items = expenseList.children

        expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

    } catch (error){
        console.log(error)
        alert("Não foi possível atualizar os totais")
    }
}
