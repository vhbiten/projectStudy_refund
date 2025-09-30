const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

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

form.onsubmit = () => {
    event.preventDefault()
}