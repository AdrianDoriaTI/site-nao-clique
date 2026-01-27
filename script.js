document.addEventListener("DOMContentLoaded", () => {

    const ponto = document.getElementById("ponto");
    const botaoQuieto = document.getElementById("quietoBtn");
    const startButton = document.getElementById("startButton");
    const conteudo = document.getElementById("conteudo");

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

    function reiniciarJogo() {
        pararTodosOsSons();
        podeClicar = false;
        jogoFinalizado = false;
        podeReiniciar = false;
        jogoIniciado = false;

        mensagemFinal.classList.remove("show");
        ponto.style.backgroundColor = "red";

        posicaoAleatoria();
        conteudo.style.opacity = 0;
        setTimeout(() => {
            conteudo.style.display = "flex";
            conteudo.style.opacity = 1;
        }, 100);
    }

    function iniciarJogo() {
        jogoIniciado = true;
        reiniciarJogo();
    }

    /* ===== BOTÃO START ===== */
    startButton.addEventListener("click", () => {
        // fade-out do start button
        startButton.style.opacity = 0;
        somComecar.play();

        setTimeout(() => {
            startButton.style.display = "none";
            conteudo.style.display = "flex";
            setTimeout(() => {
                conteudo.style.opacity = 1; // fade-in do conteúdo
            }, 50);
            iniciarJogo();
        }, 500); // tempo do fade-out
    });

    // estado inicial
    reiniciarJogo();

    /* ===== PONTO ===== */
    ponto.addEventListener("mouseenter", () => {
        if (!jogoIniciado || podeClicar || jogoFinalizado) return;

        pararTodosOsSons();
        somFugir.play();
        posicaoAleatoria();
    });

    ponto.addEventListener("pointerdown", (e) => {
        if (!jogoIniciado || podeClicar || jogoFinalizado) return;

        e.preventDefault();
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

        setTimeout(() => {
            podeReiniciar = true;
        }, 300);
    });

    /* ===== CLIQUE EM QUALQUER LUGAR PARA REINICIAR ===== */
    document.addEventListener("click", () => {
        if (jogoFinalizado && podeReiniciar) {
            reiniciarJogo();
        }
    });

});
