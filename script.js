document.addEventListener("DOMContentLoaded", () => {

    const ponto = document.getElementById("ponto");
    const botaoQuieto = document.getElementById("quietoBtn");
    const startButton = document.getElementById("startButton");
    const telaInicio = document.getElementById("telaInicio");
    const conteudoJogo = document.getElementById("conteudoJogo");

    const somFugir = document.getElementById("somFugir");
    const somQuieto = document.getElementById("somQuieto");
    const somClick = document.getElementById("somClick");
    const somComecar = document.getElementById("somComecar");

    const mensagemFinal = document.getElementById("mensagemFinal");

    const sons = [somFugir, somQuieto, somClick, somComecar];

    let podeClicar = false;
    let jogoFinalizado = false;
    let podeReiniciar = false;
    let jogoIniciado = false;

    function pararTodosOsSons() {
        sons.forEach(som => {
            som.pause();
            som.currentTime = 0;
        });
    }

    function posicaoAleatoria() {
        const tamanhoPonto = ponto.offsetWidth;
        const padding = 10;
        const x = Math.random() * (window.innerWidth - tamanhoPonto - padding);
        const y = Math.random() * (window.innerHeight - tamanhoPonto - padding);
        ponto.style.left = `${x}px`;
        ponto.style.top = `${y}px`;
    }

    /* ===== INICIAR JOGO ===== */
    function iniciarJogo() {
        jogoIniciado = true;
        podeClicar = false;
        jogoFinalizado = false;
        podeReiniciar = false;

        telaInicio.style.display = "none";   // esconde botão start
        conteudoJogo.style.display = "flex"; // mostra conteúdo do jogo
        setTimeout(() => { conteudoJogo.style.opacity = 1; }, 50);

        pararTodosOsSons();
        somComecar.play();
        posicaoAleatoria();
        ponto.style.backgroundColor = "red";
        mensagemFinal.classList.remove("show");
    }

    /* ===== BOTÃO START ===== */
    startButton.addEventListener("click", iniciarJogo);

    /* ===== PONTO ===== */
    ponto.addEventListener("mouseenter", () => {
        if (!jogoIniciado || podeClicar || jogoFinalizado) return;
        pararTodosOsSons();
        somFugir.play();
        posicaoAleatoria();
    });

    /* ===== BOTÃO "FIQUE QUIETO" ===== */
    botaoQuieto.addEventListener("click", () => {
        if (jogoFinalizado) return;
        pararTodosOsSons();
        podeClicar = true;
        somQuieto.play();
        ponto.style.backgroundColor = "lime";
    });

    /* ===== CLIQUE NO PONTO ===== */
    ponto.addEventListener("click", (e) => {
        if (!podeClicar || jogoFinalizado) return;
        e.stopPropagation();
        pararTodosOsSons();
        jogoFinalizado = true;
        somClick.play();
        ponto.style.backgroundColor = "lime";
        mensagemFinal.classList.add("show");

        setTimeout(() => { podeReiniciar = true; }, 300);
    });

    /* ===== REINICIAR JOGO ===== */
    document.addEventListener("click", () => {
        if (jogoFinalizado && podeReiniciar) {
            // reset estado do jogo
            podeClicar = false;
            jogoFinalizado = false;
            podeReiniciar = false;
            jogoIniciado = false;

            // esconder conteúdo do jogo e mensagem final
            conteudoJogo.style.display = "none";
            conteudoJogo.style.opacity = 0;
            mensagemFinal.classList.remove("show");

            // mostrar tela de start
            telaInicio.style.display = "flex";
            startButton.style.opacity = 1;
        }
    });

});
