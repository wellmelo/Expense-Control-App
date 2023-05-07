const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const nomeplayer = document.querySelector('.nomeplayer');
const timer = document.querySelector('.timer');
const timerMinutes = document.querySelector('.timer-minutes');
const timerSeconds = document.querySelector('.timer-seconds');
const timerMinutesmodal = document.querySelector('.timer-minutesmodal');
const timerSecondsmodal = document.querySelector('.timer-secondsmodal');
const timerdois = document.querySelector('.timerdois');
const refresh = document.querySelector('.refresh');
const rankButton = document.querySelector('.rankButton');
const tabelaRankingList = document.querySelector('.tabelaRankingList');
const avisoRank = document.querySelector('.avisoRank');
const closeModalRank = document.querySelector('.close2');
const closeModalEndGame = document.querySelector('.close');

// Adiciona audio de aplusos no final do game, através da função checkEndGame.
const clapping = new Audio('../audio/clapping.mp3');

function pauseClappingAudio() {
    clapping.pause();
}

// Adiciona Audio no Hover do Botao Ranking
closeModalEndGame.addEventListener('mouseover', () => {
    const modalAudioHover = new Audio('../audio/hover.mp3');
    modalAudioHover.play();
});
// Adiciona Audio no Click do Botao Ranking
closeModalEndGame.addEventListener('click', () => {
    const modalAudioClick = new Audio('../audio/exit.mp3');
    modalAudioClick.play();
});

// Inicio Modal EndGame
var modal = document.getElementById('myModal');
var btn = document.getElementById('myBtn');
var divclose = document.getElementsByClassName('close')[0];

btn.onclick = function () {
    modal.style.display = 'block';
};

divclose.onclick = function () {
    modal.style.display = 'none';
    pauseClappingAudio(); // pausa o áudio quando o modal é fechado
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
        pauseClappingAudio(); // pausa o áudio quando o modal é fechado
    }
};

// Inicio Modal Rank
var modal2 = document.getElementById('myModal2');
// Chama o botão que abre o modal
var btn2 = document.getElementById('myBtn2');
// Chama class que fecha o modal
var close2 = document.getElementsByClassName('close2')[0];
// Quando o usuário clica no botão, abrir o modal.
btn2.onclick = function () {
    modal2.style.display = 'block';
};
// Quando o usuário clicar no elemento <div class> (x), fecha o modal.
close2.onclick = function () {
    modal2.style.display = 'none';
};
// Quando o usuário clica em qualquer lugar fora do modal, fecha o modal.
window.onclick = function (event) {
    if (event.target == modal2) {
        modal2.style.display = 'none';
        const modal2ClickAudio = new Audio('../audio/exit.mp3');
        modal2ClickAudio.play();
    }
};

// Adiciona Audio no evento Hover do Botao Ranking
btn2.addEventListener('mouseover', () => {
    const modal2AudioHover = new Audio('../audio/soundhover.mp3');
    modal2AudioHover.play();
});
// Adiciona Audio no evento Click do Botao Ranking
btn2.addEventListener('click', () => {
    const modal2ClickAudio = new Audio('../audio/click.mp3');
    modal2ClickAudio.play();
});
// Adiciona Audio no evento Hover do Botao Refresh/Play Again
refresh.addEventListener('mouseover', () => {
    const RefreshAudioHover = new Audio('../audio/soundhover.mp3');
    RefreshAudioHover.play();
});
// Adiciona Audio no evento Hover do Botao Refresh/Play Again do Modal Rankin
rankButton.addEventListener('mouseover', () => {
    const RnkBtnModalAudioHover = new Audio('../audio/soundhover.mp3');
    RnkBtnModalAudioHover.play();
});
// Adiciona Audio no evento Hover no close do modal Ranking
closeModalRank.addEventListener('mouseover', () => {
    const modalcloseAudioHover = new Audio('../audio/soundhover.mp3');
    modalcloseAudioHover.play();
});
// Adiciona Audio no evento Click no close do modal Ranking
closeModalRank.addEventListener('click', () => {
    const modalCloseClickAudio = new Audio('../audio/exit.mp3');
    modalCloseClickAudio.play();
});

const characters = [
    'vedita',
    'freeza',
    'chaos',
    'dabura',
    'cell',
    'goku',
    'magromajinboo',
    'mrsatan',
    'picolo',
    'majinboogordo',
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    refresh.style.display = 'none';
    rankButton.style.display = 'none';
    tabelaRankingList.style.display = 'none';
    avisoRank.style.display = 'inline';

    return element;
};

let firstCard = '';
let secondCard = '';

function pauseClappingAudio() {
    const clappingAudio = document.getElementById('clapping-audio');
    if (clappingAudio) {
        clappingAudio.pause();
    }
}

function pauseClappingAudio() {
    clapping.pause();
    clapping.currentTime = 0;
}

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === 20) {
        clearInterval(this.loop);

        // Salva o tempo no localStorage
        const time = timerCombined.innerHTML;
        localStorage.setItem('tempo', time);

        // Quando ganha, exibe modal EndGame, Btn Refresh, Btn Refresh Modal Rank, Tabela Rank, Oculta Aviso Rank
        modal.style.display = 'block';
        refresh.style.display = 'inline';
        rankButton.style.display = 'inline';
        tabelaRankingList.style.display = 'inline';
        avisoRank.style.display = 'none';

        // Executa a função clapping ao final do jogo
        clapping.play();

        // Recupera os dados do localStorage
        const nomeUsuario = localStorage.getItem('player');
        const tempoJogo = localStorage.getItem('tempo');

        // Cria um objeto que contém as informações do resultado
        const resultado = {
            nome: nomeUsuario,
            tempo: tempoJogo,
        };

        // Recupera o histórico de resultados do localStorage ou cria um novo se não houver
        const historico = JSON.parse(localStorage.getItem('historico')) || [];

        // Adiciona o novo resultado ao histórico
        historico.push(resultado);

        // Classifica o histórico em ordem crescente de tempo
        historico.sort((a, b) => a.tempo.localeCompare(b.tempo));

        // Armazena o histórico atualizado no localStorage
        localStorage.setItem('historico', JSON.stringify(historico));

        // Percorre o histórico e cria elementos da tabela HTML para exibir as informações de cada registro
        const rankingList = document.getElementById('ranking-list');
        rankingList.innerHTML = '';
        historico.forEach((resultado, indice) => {
            const linha = document.createElement('tr');
            const posicao = indice + 1;
            const posicaoColuna = document.createElement('td');
            const nomeColuna = document.createElement('td');
            const tempoColuna = document.createElement('td');
            posicaoColuna.innerHTML = `${posicao}º`;
            nomeColuna.innerHTML = resultado.nome;
            tempoColuna.innerHTML = `${resultado.tempo}s`;
            linha.appendChild(posicaoColuna);
            linha.appendChild(nomeColuna);
            linha.appendChild(tempoColuna);
            rankingList.appendChild(linha);
        });
    }
};

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        const achouPar = new Audio('../audio/showcard.mp3');
        achouPar.play();

        checkEndGame();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';

            const errouPar = new Audio('../audio/exit.mp3');
            errouPar.play();
        }, 500);
    }
};

const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }
    if (firstCard == '' && !target.parentNode.className.includes('grid')) {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
        console.log(target.parentNode);
    } else if (
        secondCard === '' &&
        !target.parentNode.className.includes('grid')
    ) {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
        console.log(target.parentNode);

        checkCards();
    }
};

const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../images/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    // adiciona audio ao evento click na class card
    card.addEventListener('click', () => {
        const cardClickAudio = new Audio('../audio/click.mp3');
        cardClickAudio.play();
    });

    // adiciona audio ao evento hover na class card
    card.addEventListener('mouseover', () => {
        const cardAudioHover = new Audio('../audio/hover.mp3');
        cardAudioHover.play();
    });

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);

    return card;
};

/* Função createCard sem audio nos eventos hover e click
    const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../images/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);

    return card;
}; */

const loadGame = () => {
    const duplicateCharacters = [...characters, ...characters];

    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
};

const startTimer = () => {
    let seconds = 0;

    this.loop = setInterval(() => {
        seconds++;

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        // Atualiza o timer de minutos e segundos combinados
        timerCombined.innerHTML =
            String(minutes).padStart(2, '0') +
            ':' +
            String(remainingSeconds).padStart(2, '0');

        timerCombined2.innerHTML =
            String(minutes).padStart(2, '0') +
            ':' +
            String(remainingSeconds).padStart(2, '0');

        // Atualiza o timer de minutos e segundos separados
        timerMinutes.innerHTML = String(minutes).padStart(2, '0');
        timerSeconds.innerHTML = String(remainingSeconds).padStart(2, '0');
    }, 1000);
};

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    nomeplayer.innerHTML = localStorage.getItem('player');

    startTimer();
    loadGame();
};
