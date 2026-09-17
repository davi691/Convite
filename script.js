// ============================================================
// CONFIGURAÇÃO
// ============================================================
// Para salvar os nomes ONLINE, cole aqui a URL do seu Google Apps Script.
// Se deixar vazio, o convite funciona normalmente, mas não salva online.
const URL_GOOGLE_APPS_SCRIPT = "";

const botaoNao = document.getElementById("nao");
const telaPegadinha = document.getElementById("pegadinha");
const telaConfirmacao = document.getElementById("confirmacao");
const telaPresente = document.getElementById("presente");
const telaSucesso = document.getElementById("sucesso");
const telaBloqueado = document.getElementById("bloqueado");

let nomeAtual = "";
let salvando = false;

function fugirDoBotao() {
    const largura = window.innerWidth;
    const altura = window.innerHeight;

    const limiteX = Math.max(10, largura - botaoNao.offsetWidth - 20);
    const limiteY = Math.max(10, altura - botaoNao.offsetHeight - 20);

    botaoNao.style.position = "fixed";
    botaoNao.style.left = Math.random() * limiteX + "px";
    botaoNao.style.top = Math.random() * limiteY + "px";
    botaoNao.style.zIndex = "999";

    const frases = ["NÃO 😭", "ERROU 😂", "TENTA DE NOVO", "NÃO PODE", "QUASE!", "KKKKKK", "IMPOSSÍVEL"];
    botaoNao.textContent = "❌ " + frases[Math.floor(Math.random() * frases.length)];
}

botaoNao.addEventListener("mouseenter", fugirDoBotao);
botaoNao.addEventListener("touchstart", function(e) {
    e.preventDefault();
    fugirDoBotao();
});
botaoNao.addEventListener("click", function() {
    telaPegadinha.classList.add("ativa");
});

function abrirConfirmacao() {
    telaConfirmacao.classList.add("ativa");
    setTimeout(() => document.getElementById("nome").focus(), 150);
}

function fecharConfirmacao() {
    telaConfirmacao.classList.remove("ativa");
    document.getElementById("erroNome").textContent = "";
}

function continuarConfirmacao() {
    const campo = document.getElementById("nome");
    const erro = document.getElementById("erroNome");
    const nome = campo.value.trim();

    if (nome.length < 2) {
        erro.textContent = "Digite seu nome para continuar.";
        campo.focus();
        return;
    }

    nomeAtual = nome;
    document.getElementById("nomeMostrado").textContent = nomeAtual;
    erro.textContent = "";
    telaConfirmacao.classList.remove("ativa");
    telaPresente.classList.add("ativa");
}

async function responderPresente(vaiLevar) {
    const erro = document.getElementById("erroPresente");

    if (!vaiLevar) {
        document.getElementById("nomeBloqueado").textContent = nomeAtual;
        telaPresente.classList.remove("ativa");
        telaBloqueado.classList.add("ativa");
        return;
    }

    if (salvando) return;
    salvando = true;
    erro.textContent = "";

    // Salva no navegador também, como backup local.
    const lista = JSON.parse(localStorage.getItem("confirmados_festa") || "[]");
    lista.push({
        nome: nomeAtual,
        presente: "Sim",
        data: new Date().toLocaleString("pt-BR")
    });
    localStorage.setItem("confirmados_festa", JSON.stringify(lista));

    // Salva online se uma URL do Google Apps Script foi configurada.
    if (URL_GOOGLE_APPS_SCRIPT.trim() !== "") {
        try {
            await fetch(URL_GOOGLE_APPS_SCRIPT, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "text/plain;charset=utf-8" },
                body: JSON.stringify({
                    nome: nomeAtual,
                    presente: true
                })
            });
        } catch (e) {
            console.warn("Não foi possível enviar para o armazenamento online.", e);
        }
    }

    document.getElementById("nomeFinal").textContent = nomeAtual;
    document.getElementById("presenteFinal").textContent = "🎁 Você confirmou que vai levar presente.";
    telaPresente.classList.remove("ativa");
    telaSucesso.classList.add("ativa");
    criarConfetes();

    salvando = false;
}

function voltarParaPresente() {
    telaBloqueado.classList.remove("ativa");
    telaPresente.classList.add("ativa");
}

function fecharSucesso() {
    telaSucesso.classList.remove("ativa");
}

function fecharPegadinha() {
    telaPegadinha.classList.remove("ativa");
    abrirConfirmacao();
}

function abrirMapa() {
    const endereco = "Café Colonial Suruvi";
    const url = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(endereco);
    window.open(url, "_blank");
}

function criarConfetes() {
    for (let i = 0; i < 80; i++) {
        const confete = document.createElement("div");
        confete.textContent = ["🎉", "🎊", "✨", "🎈", "🥳"][Math.floor(Math.random() * 5)];
        confete.style.position = "fixed";
        confete.style.left = Math.random() * 100 + "vw";
        confete.style.top = "-50px";
        confete.style.fontSize = (15 + Math.random() * 25) + "px";
        confete.style.zIndex = "9999";
        confete.style.pointerEvents = "none";

        document.body.appendChild(confete);

        const duracao = 2000 + Math.random() * 3000;
        const destino = window.innerHeight + 100;

        confete.animate([
            { transform: "translateY(0) rotate(0deg)", opacity: 1 },
            { transform: `translateY(${destino}px) rotate(${Math.random() * 720}deg)`, opacity: 0.8 }
        ], {
            duration: duracao,
            easing: "ease-in"
        });

        setTimeout(() => confete.remove(), duracao);
    }
}

window.addEventListener("resize", function() {
    if (botaoNao.style.position === "fixed") {
        botaoNao.style.left = "50%";
        botaoNao.style.top = "auto";
    }
});
