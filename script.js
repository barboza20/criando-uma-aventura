document.addEventListener('DOMContentLoaded', () => {
    const playerNameElement = document.getElementById('player-name');
    const energyStat = document.getElementById('energy-stat');
    const skillStat = document.getElementById('skill-stat');
    const popularityStat = document.getElementById('popularity-stat');
    const narrativeElement = document.getElementById('game-narrative');
    const choiceButtonsElement = document.getElementById('choice-buttons');

    let playerStats = {
        energy: 100,
        skill: 75,
        popularity: 20
    };
    
    const gameStory = {
        initial: {
            text: "Você está prestes a entrar em campo para a grande final. O que você faz?",
            choices: [
                { text: "Passar a bola", action: "passar" },
                { text: "Driblar o adversário", action: "driblar" }
            ]
        },
        passar_success: {
            text: "Você faz um passe perfeito! A torcida vibra e sua popularidade aumenta. Mas você gastou um pouco de energia.",
            effect: { energy: -10, popularity: 5 },
            next: "proximo_lance"
        },
        passar_fail: {
            text: "Seu passe é interceptado! A torcida murmura. Você precisa recuperar a bola.",
            effect: { energy: -5 },
            next: "recuperar_bola"
        },
        driblar_success: {
            text: "Você aplica um drible mágico e deixa o adversário para trás! Sua habilidade e popularidade disparam.",
            effect: { energy: -20, skill: 10, popularity: 15 },
            next: "proximo_lance"
        },
        driblar_fail: {
            text: "O adversário desarma você e a bola é perdida. Você se sente frustrado.",
            effect: { energy: -10 },
            next: "recuperar_bola"
        },
        proximo_lance: {
            text: "A bola volta para você. O placar está 0 a 0 e o jogo se aproxima do fim. O que você faz agora?",
            choices: [
                { text: "Chutar pro gol", action: "chutar" },
                { text: "Passar para um companheiro", action: "passar" }
            ]
        },
        recuperar_bola: {
            text: "Você se esforça para recuperar a bola e consegue. Está cansado, mas o jogo continua. O que você faz?",
            choices: [
                { text: "Manter a posse de bola", action: "posse_bola" },
                { text: "Tentar uma nova jogada", action: "driblar" }
            ]
        },
        // Adicione outros cenários (chutar, posse de bola, etc.) para expandir a história
        // Crie também um final, como "final_vitoria" ou "final_derrota"
    };

    function updateStats() {
        energyStat.textContent = playerStats.energy;
        skillStat.textContent = playerStats.skill;
        popularityStat.textContent = playerStats.popularity;
    }

    function showScene(sceneKey) {
        const scene = gameStory[sceneKey];
        if (scene.effect) {
            playerStats.energy += scene.effect.energy || 0;
            playerStats.skill += scene.effect.skill || 0;
            playerStats.popularity += scene.effect.popularity || 0;
            updateStats();
        }
        
        narrativeElement.textContent = scene.text;
        
        while (choiceButtonsElement.firstChild) {
            choiceButtonsElement.removeChild(choiceButtonsElement.firstChild);
        }
        
        if (scene.choices) {
            scene.choices.forEach(choice => {
                const button = document.createElement('button');
                button.classList.add('btn');
                button.textContent = choice.text;
                button.addEventListener('click', () => {
                    handleChoice(choice.action);
                });
                choiceButtonsElement.appendChild(button);
            });
        }
    }

    function handleChoice(action) {
        let result;
        // Lógica simples para determinar o sucesso de uma ação
        const random = Math.random();
        if (action === "driblar") {
            result = random * 100 < playerStats.skill ? "driblar_success" : "driblar_fail";
        } else if (action === "passar") {
            result = random * 100 < 80 ? "passar_success" : "passar_fail";
        }
        
        showScene(result);
        
        // Exibir botão para a próxima ação após a escolha
        if (gameStory[result].next) {
            const nextBtn = document.createElement('button');
            nextBtn.classList.add('btn');
            nextBtn.textContent = "Continuar";
            nextBtn.onclick = () => showScene(gameStory[result].next);
            choiceButtonsElement.appendChild(nextBtn);
        }
    }
    
    // Iniciar o jogo
    updateStats();
    showScene("initial");
});
