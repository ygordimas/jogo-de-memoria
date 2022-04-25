//fazer uma lista de todos os elementos carta
const cartas = document.querySelectorAll('.carta');
let flipou = false;
let primeiraCarta, segundaCarta;
let lockBoard = false;
let tentativas = 0;
let acertos = 0;
const campoTentativas = document.querySelector('.tentativas-score');
// const campoAcertos = document.querySelector('.numero-score');
const botaoRestart = document.getElementById('restart');
const painelRestart = document.querySelector('.resetar-board');
const numeroDeTentativas = document.querySelector('.score-final-tentativas')

//loop pela lista e adicionar um eventlistener click que executa a função de flip
//a função flip adiciona uma classe ao elemento clicado
//a classe rotaciona o elemento 180º no axis Y
cartas.forEach(carta => carta.addEventListener('click', flipaCarta))

function flipaCarta() {
    if (lockBoard || this === primeiraCarta) {
        return;
    }
    this.classList.add('flipa')

    if (!flipou) {
        //primeiro click
        flipou = true;
        primeiraCarta = this;
        return;
    }

    //segundo click
    flipou = false;
    segundaCarta = this;

    checkForMatch();

}

function checkForMatch() {
    //verificando o match

    let isMatch = primeiraCarta.dataset.biro === segundaCarta.dataset.biro;

    isMatch ? removeCartas() : desviraCartas();


}

function removeCartas() {
    primeiraCarta.removeEventListener('click', flipaCarta);
    segundaCarta.removeEventListener('click', flipaCarta);

    cartaDesaparece();
    resetaBoard();
}

function cartaDesaparece() {
    const frontPrimeira = primeiraCarta.querySelector('.carta--frente');
    const frontSegunda = segundaCarta.querySelector('.carta--frente');
    

    setTimeout(() => {
        frontPrimeira.classList.add('opacidade');
        frontPrimeira.classList.add('tamanho');
        frontSegunda.classList.add('opacidade');
        frontSegunda.classList.add('tamanho');
    }, 500);

    vistoMatch();
    adicionaCartasColetadas();

    // acertos++;
    // campoAcertos.textContent = acertos;

}

function vistoMatch() {
    const vistoPrimeira = primeiraCarta.lastElementChild;
    const vistoSegunda = segundaCarta.lastElementChild;

    setTimeout(() => {
        vistoPrimeira.classList.add('carta--coletada-ativo');
        vistoSegunda.classList.add('carta--coletada-ativo');
    }, 500)

}

function desviraCartas() {
    lockBoard = true;

    setTimeout(() => {
        primeiraCarta.classList.remove('flipa');
        segundaCarta.classList.remove('flipa');

        tentativas++;
        campoTentativas.textContent = tentativas;
        numeroDeTentativas.textContent = tentativas;
        resetaBoard();
    }, 1200)
}

function resetaBoard() {
    [flipou, lockBoard] = [false, false];
    [primeiraCarta, segundaCarta] = [null, null];
}

botaoRestart.addEventListener('click', restart)

function restart() {

    cartas.forEach(carta => {
        let visto = carta.lastElementChild;
        let cartaImagem = carta.querySelector('.carta--frente');

        carta.classList.remove('flipa');
        cartaImagem.classList.remove('opacidade')
        cartaImagem.classList.remove('tamanho')
        visto.classList.remove('carta--coletada-ativo');
        carta.addEventListener('click', flipaCarta);

        
        let posicaoAleatoria = Math.floor(Math.random() * 12);
        carta.style.order = posicaoAleatoria;
        
    })

    cartasColetadas.splice(0, cartasColetadas.length);
    sideboardCartas.innerHTML = '';
    tentativas = 0;
    // acertos = 0;
    // campoAcertos.textContent = acertos;
    campoTentativas.textContent = tentativas;
    resetaBoard()
    painelRestart.classList.remove('resetar-board-visivel')
    

}


