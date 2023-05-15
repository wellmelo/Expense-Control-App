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
    firebase
        .firestore()
        .collection('transactions')
        .where('user.uid', '==', user.uid)
        .orderBy('date', 'desc')
        .get()
        .then((snapshot) => {
            hideLoading();
            const transactions = snapshot.docs.map((doc) => ({
                ...doc.data(),
                uid: doc.id,
            }));
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

    transactions.forEach((transaction) => {
        const li = document.createElement('li');
        li.classList.add(transaction.type);
        li.id = transaction.uid;
        li.addEventListener('click', () => {
            window.location.href =
                'https://smartmoney.wellmelo.com/pages/transaction/index.html?uid=' +
                transaction.uid;
        });

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'X';
        deleteButton.classList.add('outline', 'danger');
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            askRemoveTransaction(transaction);
        });
        li.appendChild(deleteButton);

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

        orderedList.appendChild(li);
    });
}

function askRemoveTransaction(transaction) {
    const shouldRemove = confirm('Deseja remover a transaçao?');
    if (shouldRemove) {
        removeTransaction(transaction);
    }
}

function removeTransaction(transaction) {
    showLoading();

    firebase
        .firestore()
        .collection('transactions')
        .doc(transaction.uid)
        .delete()
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
