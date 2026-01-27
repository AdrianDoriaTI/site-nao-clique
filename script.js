document.addEventListener("DOMContentLoaded", () => {

    /* ===== ELEMENTOS DO DOM ===== */
    const ponto = document.getElementById("ponto");             // ponto vermelho
    const botaoQuieto = document.getElementById("quietoBtn");   // botão "Fique quieto"
    const startButton = document.getElementById("startButton"); // botão "Começar"
    const telaInicio = document.getElementById("telaInicio");   // container tela inicial
    const conteudoJogo = document.getElementById("conteudoJogo"); // container do jogo

    const somFugir = document.getElementById("somFugir");       // som quando ponto foge
    const somQuieto = document.getElementById("somQuieto");     // som quando clica "Fique quieto"
    const somClick = document.getElementById("somClick");       // som quando clica no ponto final
    const somComecar = document.getElementById("somComecar");   // som do início do jogo

    const mensagemFinal = document.getElementById("mensagemFinal"); // overlay mensagem final

    const sons = [somFugir, somQuieto, somClick, somComecar];  // array com todos os sons

    /* ===== VARIÁVEIS DE ESTADO ===== */
    let podeClicar = false;      // controla se o ponto pode ser clicado para finalizar
    let jogoFinalizado = false;  // indica se o jogo acabou
    let podeReiniciar = false;   // controla se o clique na tela reinicia o jogo
    let jogoIniciado = false;    // indica se o jogo já começou

    /* ===== FUNÇÃO PARA PARAR TODOS OS SONS ===== */
    function pararTodosOsSons() {
        sons.forEach(som => {
            som.pause();
            som.currentTime = 0;
        });
    }

    /* ===== FUNÇÃO PARA POSICIONAR O PONTO ALEATORIAMENTE ===== */
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
        setTimeout(() => { conteudoJogo.style.opacity = 1; }, 50); // fade-in

        pararTodosOsSons();
        somComecar.play();          // som de início
        posicaoAleatoria();         // posiciona ponto aleatoriamente
        ponto.style.backgroundColor = "red"; // ponto vermelho
        mensagemFinal.classList.remove("show"); // esconde overlay final
    }

    /* ===== BOTÃO START ===== */
    startButton.addEventListener("click", iniciarJogo);

    /* ===== PONTO FUGINDO DO MOUSE ===== */
    ponto.addEventListener("mouseenter", () => {
        if (!jogoIniciado || podeClicar || jogoFinalizado) return;
        pararTodosOsSons();
        somFugir.play();
        posicaoAleatoria();
    });

    /* ===== PONTO - toque/click mobile ===== */
    ponto.addEventListener("pointerdown", (e) => {
        if (!jogoIniciado || podeClicar || jogoFinalizado) {
            e.preventDefault();      // previne comportamento padrão do touch
            e.stopPropagation();     // 🔹 evita que o clique atravesse para o botão "Fique quieto"
            pararTodosOsSons();
            somFugir.play();
            posicaoAleatoria();
        }
    });

    /* ===== BOTÃO "FIQUE QUIETO" ===== */
    botaoQuieto.addEventListener("click", () => {
        if (jogoFinalizado) return;
        pararTodosOsSons();
        podeClicar = true;             // agora podemos clicar no ponto para finalizar
        somQuieto.play();              // som de "ficar quieto"
        ponto.style.backgroundColor = "lime"; // ponto fica verde
    });

    /* ===== CLIQUE NO PONTO ===== */
    ponto.addEventListener("click", (e) => {
        if (!podeClicar || jogoFinalizado) return;

        e.stopPropagation();           // impede que o clique suba para o document
        pararTodosOsSons();
        jogoFinalizado = true;
        somClick.play();
        ponto.style.backgroundColor = "lime";
        mensagemFinal.classList.add("show"); // mostra overlay final

        setTimeout(() => { podeReiniciar = true; }, 300); // habilita reinício
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
