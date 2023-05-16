function logout() {
    firebase
        .auth()
        .signOut()
        .then(() => {
            window.location.href = '/';
        })
        .catch(() => {
            alert('Erro ao fazer logout');
        });
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        findTransactions(user);
    }
});

function newTransaction() {
    window.location.href = '/pages/transaction';
}

function findTransactions(user) {
    showLoading();
    transactionService
        .findByUser(user)
        .then((transactions) => {
            hideLoading();
            addTransactionsToScreen(transactions);
        })
        .catch((error) => {
            hideLoading();
            console.log(error);
            alert('Erro ao recuperar transacoes');
        });
}

function addTransactionsToScreen(transactions) {
    const orderedList = document.getElementById('transactions');
    //// Adiciona Expense e Income
    const expenseTotals = {};
    const incomeTotals = {};
    //////////////////////////////

    transactions.forEach((transaction) => {
        const li = createTransactionListItem(transaction);
        li.appendChild(createDeleteButton(transaction));

        const typeTransaction = document.createElement('div');
        typeTransaction.innerHTML = '';
        typeTransaction.classList.add('tipotransacao');
        li.appendChild(typeTransaction);

        // Start Date
        const date = document.createElement('p');
        date.textContent = formatDate(transaction.date);
        date.classList.add('classdate');

        const iconDate = document.createElement('i');
        iconDate.classList.add('fa', 'fa-calendar');
        iconDate.setAttribute('aria-hidden', 'true');

        date.insertBefore(iconDate, date.firstChild);

        li.appendChild(date);
        // End Date

        // Start Money
        const money = document.createElement('p');
        money.innerHTML = formatMoney(transaction.money);
        money.classList.add('classmoney');

        const iconMoney = document.createElement('i');
        iconMoney.classList.add('fa', 'fa-money');
        iconMoney.setAttribute('aria-hidden', 'true');

        money.insertBefore(iconMoney, money.firstChild);

        li.appendChild(money);

        // Start Type
        const type = document.createElement('p');
        type.innerHTML = transaction.transactionType;
        type.classList.add('classtype');

        const icontype = document.createElement('i');
        icontype.classList.add('fa', 'fa-file-text-o');
        icontype.setAttribute('aria-hidden', 'true');

        type.insertBefore(icontype, type.firstChild);

        li.appendChild(type);

        // Start Description
        if (transaction.description) {
            const description = document.createElement('p');
            description.innerHTML = transaction.description;
            description.classList.add('classdescription');

            const icondescription = document.createElement('i');
            icondescription.classList.add('fa', 'fa-font');
            icondescription.setAttribute('aria-hidden', 'true');

            description.insertBefore(icondescription, description.firstChild);

            li.appendChild(description);
        }

        const currencyCode = transaction.money.currency;

        //// Adiciona Expense e Income
        if (transaction.type === 'expense') {
            if (!expenseTotals[currencyCode]) {
                expenseTotals[currencyCode] = 0;
            }
            expenseTotals[currencyCode] += transaction.money.value;
        } else if (transaction.type === 'income') {
            if (!incomeTotals[currencyCode]) {
                incomeTotals[currencyCode] = 0;
            }
            incomeTotals[currencyCode] += transaction.money.value;
        }
        ////////////////////////

        orderedList.appendChild(li);
    });

    // Exibir os totais de Expense por moeda
    for (const currencyCode in expenseTotals) {
        const totalExpenseElement = document.getElementById(
            'total-expense-' + currencyCode
        );
        const totalExpense = expenseTotals[currencyCode];
        // Texto que aparece na Div
        totalExpenseElement.innerHTML =
            '<strong>' + currencyCode + ':</strong> ' + totalExpense.toFixed(2);
    }

    // Exibir os totais de Income por moeda
    for (const currencyCode in incomeTotals) {
        const totalIncomeElement = document.getElementById(
            'total-income-' + currencyCode
        );
        const totalIncome = incomeTotals[currencyCode];
        // Texto que aparece na Div
        totalIncomeElement.innerHTML =
            '<strong>' + currencyCode + ':</strong> ' + totalIncome.toFixed(2);
    }
}

function createTransactionListItem(transaction) {
    const li = document.createElement('li');
    li.classList.add(transaction.type);
    li.id = transaction.uid;
    li.addEventListener('click', () => {
        window.location.href =
            '/pages/transaction/index.html?uid=' + transaction.uid;
    });

    return li;
}

function createDeleteButton(transaction) {
    const li = createTransactionListItem(transaction);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'X';
    deleteButton.classList.add('outline', 'danger');
    deleteButton.addEventListener('click', (event) => {
        event.stopPropagation();
        askRemoveTransaction(transaction);
    });
    li.appendChild(deleteButton);

    return deleteButton;
}

function askRemoveTransaction(transaction) {
    const shouldRemove = confirm('Deseja remover a transaçao?');
    if (shouldRemove) {
        removeTransaction(transaction);
    }
}

function removeTransaction(transaction) {
    showLoading();

    transactionService
        .remove(transaction)
        .then(() => {
            hideLoading();
            document.getElementById(transaction.uid).remove();
        })
        .catch((error) => {
            hideLoading();
            console.log(error);
            alert('Erro ao remover transaçao');
        });
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-br');
}

function formatMoney(money) {
    return `${money.currency} ${money.value.toFixed(2)}`;
}

// Função para somar os valores das classes .classmoney
function sumTransactionValues() {
    const moneyElements = document.getElementsByClassName('classmoney');
    let total = 0;

    for (let i = 0; i < moneyElements.length; i++) {
        const text = moneyElements[i].textContent.trim();
        const formattedText = text.replace('.', ',');
        const value = parseFloat(
            formattedText.replace(/[^0-9,-]+/g, '').replace(',', '.')
        );

        if (!isNaN(value)) {
            total += value;
        }
    }

    return total.toFixed(2);
}
