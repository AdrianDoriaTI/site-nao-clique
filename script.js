document.addEventListener("DOMContentLoaded", () => {

    const ponto = document.getElementById("ponto");
    const botaoQuieto = document.getElementById("quietoBtn");

    const somFugir = document.getElementById("somFugir");
    const somQuieto = document.getElementById("somQuieto");
    const somClick = document.getElementById("somClick");

    const mensagemFinal = document.getElementById("mensagemFinal");

    const sons = [somFugir, somQuieto, somClick];

    let podeClicar = false;
    let jogoFinalizado = false;
    let podeReiniciar = false;

    function pararTodosOsSons() {
        sons.forEach(som => {
            som.pause();
            som.currentTime = 0;
        });
    }

    function posicaoAleatoria() {
        const padding = 30;
        const x = Math.random() * (window.innerWidth - padding);
        const y = Math.random() * (window.innerHeight - padding);
        ponto.style.left = `${x}px`;
        ponto.style.top = `${y}px`;
    }

    function reiniciarJogo() {
        pararTodosOsSons();
        podeClicar = false;
        jogoFinalizado = false;
        podeReiniciar = false;

        mensagemFinal.style.display = "none";
        ponto.style.backgroundColor = "red";

        posicaoAleatoria();
    }

    // estado inicial
    reiniciarJogo();

    // ponto foge do mouse
    ponto.addEventListener("mouseenter", () => {
        if (!podeClicar && !jogoFinalizado) {
            pararTodosOsSons();
            somFugir.play();
            posicaoAleatoria();
        }
    });

    // botão "Fique quieto"
    botaoQuieto.addEventListener("click", () => {
        if (jogoFinalizado) return;

        pararTodosOsSons();
        podeClicar = true;
        somQuieto.play();
        ponto.style.backgroundColor = "lime";
    });

    // clique final no ponto
    ponto.addEventListener("click", (e) => {
        if (!podeClicar || jogoFinalizado) return;

        e.stopPropagation(); // 👈 impede o clique de subir para o document

        pararTodosOsSons();
        jogoFinalizado = true;
        somClick.play();
        mensagemFinal.style.display = "flex";

        // agora SIM pode reiniciar em outro clique
        setTimeout(() => {
            podeReiniciar = true;
        }, 300);
    });

    // clique em qualquer lugar para reiniciar (APÓS final)
    document.addEventListener("click", () => {
        if (jogoFinalizado && podeReiniciar) {
            reiniciarJogo();
        }
    });

});
