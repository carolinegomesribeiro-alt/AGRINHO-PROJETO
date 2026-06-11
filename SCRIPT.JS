let prod = 50;
let amb = 50;
let historicoDecisoes = [];
const MAX_HISTORICO = 20;
let bloqueioClique = false;

function processar(decisao) {
    if (bloqueioClique) return;
    bloqueioClique = true;
    setTimeout(() => {
        bloqueioClique = false;
    }, 300);

    const feedback = document.getElementById("conselho");

    switch (decisao) {
        case "gotejamento":
            prod += 10;
            amb += 15;
            feedback.innerText = "Excelente escolha! Economia de água gera sustentabilidade.";
            break;
        case "aspersao":
            prod += 5;
            amb -= 15;
            feedback.innerText = "Cuidado: o desperdício de água prejudica o meio ambiente.";
            break;
        case "biologico":
            prod += 5;
            amb += 20;
            feedback.innerText = "Ótimo! O controle biológico protege o ecossistema.";
            break;
        case "quimico":
            prod += 15;
            amb -= 25;
            feedback.innerText = "A produção aumentou, mas houve impacto ambiental.";
            break;
        case "reflorestamento":
            prod += 5;
            amb += 25;
            feedback.innerText = "Excelente! O reflorestamento recupera áreas degradadas.";
            break;
        case "desmatamento":
            prod += 20;
            amb -= 30;
            feedback.innerText = "A produção cresceu, porém o dano ambiental foi alto.";
            break;
    }

    // Garante que os valores fiquem entre 0 e 100
    prod = Math.max(0, Math.min(100, prod));
    amb = Math.max(0, Math.min(100, amb));

    // Atualiza a tela
    document.getElementById("prod").innerText = prod;
    document.getElementById("amb").innerText = amb;

    // Adiciona ao histórico
    historicoDecisoes.push(decisao);
    if (historicoDecisoes.length > MAX_HISTORICO) {
        historicoDecisoes.shift();
    }

    atualizarHistorico();
    verificarFim();
}

function atualizarHistorico() {
    const lista = document.getElementById("listaHistorico");
    lista.innerHTML = "";
    historicoDecisoes.forEach(item => {
        const li = document.createElement("li");
        // Deixa o nome do histórico amigável (Primeira letra maiúscula)
        li.textContent = item.charAt(0).toUpperCase() + item.slice(1);
        lista.appendChild(li);
    });
}

function verificarFim() {
    const feedback = document.getElementById("conselho");
    if (amb <= 0) {
        feedback.innerText = "Fim de jogo! O meio ambiente foi destruído.";
    } else if (prod <= 0) {
        feedback.innerText = "Fim de jogo! A produção faliu.";
    }
}

function reiniciarJogo() {
    prod = 50;
    amb = 50;
    historicoDecisoes = [];
    document.getElementById("prod").innerText = prod;
    document.getElementById("amb").innerText = amb;
    document.getElementById("conselho").innerText = "Jogo reiniciado! Faça sua escolha.";
    document.getElementById("listaHistorico").innerHTML = "";
}
