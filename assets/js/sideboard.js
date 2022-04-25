let cartasColetadas = [];
let sideboardCartas = document.querySelector('.sideboard-cartas');

function adicionaCartasColetadas() {
    let novaCarta = document.createElement('div');
    let imagemReferencia = primeiraCarta.querySelector('.carta--frente').cloneNode(false);
    

    setTimeout(() => {

        
        novaCarta.classList.add('sideboard-carta');
        // console.log(imagemReferencia)
        imagemReferencia.classList.remove(...imagemReferencia.classList);
        // console.log(imagemReferencia)
        // novaCartaImagem.classList.remove(...novaCartaImagem.classList);
        novaCarta.appendChild(imagemReferencia);
        sideboardCartas.appendChild(novaCarta);

        cartasColetadas.push(novaCarta);
        posicionaCartasColetadas();

        if (cartasColetadas.length == 8) {
            setTimeout(() => {
                painelRestart.classList.add('resetar-board-visivel')
            })
        }

    }, 700)

    novaCarta.classList.add('novaCartaAnim');
    
}
function posicionaCartasColetadas() {

    for (i = 0; i < cartasColetadas.length; i++) {
        let carta = cartasColetadas[i];
        let altura = -100;
    
        carta.style.marginTop = altura + 'px';
        carta.style.order = '0';

    }
}


