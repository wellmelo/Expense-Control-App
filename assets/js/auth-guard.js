firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        window.location.href = 'https://smartmoney.wellmelo.com/';
    }
});
