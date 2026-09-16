const botaoNao = document.getElementById("nao");
const botaoSim = document.getElementById("sim");

const telaSucesso = document.getElementById("sucesso");
const telaPegadinha = document.getElementById("pegadinha");


/*
====================================================
BOTÃO NÃO VOU
====================================================
*/

function fugirDoBotao() {

    const largura = window.innerWidth;
    const altura = window.innerHeight;

    const limiteX = Math.max(10, largura - botaoNao.offsetWidth - 20);
    const limiteY = Math.max(10, altura - botaoNao.offsetHeight - 20);

    const x = Math.random() * limiteX;
    const y = Math.random() * limiteY;

    botaoNao.style.position = "fixed";
    botaoNao.style.left = x + "px";
    botaoNao.style.top = y + "px";

    botaoNao.style.zIndex = "999";

    frasesNao();
}


/*
Muda o texto do botão enquanto ele foge
*/

function frasesNao() {

    const frases = [
        "NÃO 😭",
        "ERROU 😂",
        "TENTA DE NOVO",
        "NÃO PODE",
        "QUASE!",
        "KKKKKK",
        "IMPOSSÍVEL",
        "NEM TENTA"
    ];

    const frase =
        frases[Math.floor(Math.random() * frases.length)];

    botaoNao.textContent = "❌ " + frase;
}


/*
PC:
quando o mouse chega perto, o botão foge.
*/

botaoNao.addEventListener("mouseenter", function () {

    fugirDoBotao();

});


/*
CELULAR:
ao tocar no botão, ele foge.
*/

botaoNao.addEventListener("touchstart", function (evento) {

    evento.preventDefault();

    fugirDoBotao();

});


/*
Se conseguir clicar mesmo assim,
abre a pegadinha.
*/

botaoNao.addEventListener("click", function () {

    telaPegadinha.classList.add("ativa");

});


/*
====================================================
BOTÃO EU VOU
====================================================
*/

function aceitarConvite() {

    telaSucesso.classList.add("ativa");

    criarConfetes();

}


/*
====================================================
FECHAR TELAS
====================================================
*/

function fecharSucesso() {

    telaSucesso.classList.remove("ativa");

}


function fecharPegadinha() {

    telaPegadinha.classList.remove("ativa");

    aceitarConvite();

}


/*
====================================================
ABRIR GOOGLE MAPS
====================================================

Troque o endereço abaixo pelo endereço real da festa.
*/

function abrirMapa() {

    const endereco =
        "Salão de Festas do Bairro, Rio do Sul, SC";

    const url =
        "https://www.google.com/maps/search/?api=1&query="
        + encodeURIComponent(endereco);

    window.open(url, "_blank");

}


/*
====================================================
CONFETES
====================================================
*/

function criarConfetes() {

    const quantidade = 80;

    for (let i = 0; i < quantidade; i++) {

        const confete = document.createElement("div");

        confete.textContent = [
            "🎉",
            "🎊",
            "✨",
            "🎈",
            "🥳"
        ][Math.floor(Math.random() * 5)];

        confete.style.position = "fixed";

        confete.style.left =
            Math.random() * 100 + "vw";

        confete.style.top = "-50px";

        confete.style.fontSize =
            (15 + Math.random() * 25) + "px";

        confete.style.zIndex = "9999";

        confete.style.pointerEvents = "none";

        document.body.appendChild(confete);

        const duracao =
            2000 + Math.random() * 3000;

        const destino =
            window.innerHeight + 100;

        confete.animate(
            [
                {
                    transform: "translateY(0) rotate(0deg)",
                    opacity: 1
                },
                {
                    transform:
                        `translateY(${destino}px) rotate(${Math.random() * 720}deg)`,
                    opacity: 0.8
                }
            ],
            {
                duration: duracao,
                easing: "ease-in"
            }
        );

        setTimeout(() => {

            confete.remove();

        }, duracao);

    }

}


/*
====================================================
EFEITO EXTRA:
se a pessoa redimensionar a tela,
o botão continua funcionando.
====================================================
*/

window.addEventListener("resize", function () {

    if (botaoNao.style.position === "fixed") {

        botaoNao.style.left = "50%";
        botaoNao.style.top = "auto";

    }

});