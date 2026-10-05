document.addEventListener('DOMContentLoaded', () => {
    const scorePlayerInput = document.getElementById('score-player');
    const scoreComputerInput = document.getElementById('score-computer');
    const logPlayer = document.getElementById('log-player');
    const logComputer = document.getElementById('log-computer');
    const verdictBox = document.getElementById('verdict');
    const buttons = document.querySelectorAll('.button-group .win98-btn');
    const resetBtn = document.getElementById('btn-reset');

    let stats = {
        player: 0,
        computer: 0
    };

    const options = ['rock', 'scissors', 'paper'];
    const translations = {
        'rock': 'Камінь',
        'scissors': 'Ножиці',
        'paper': 'Папір'
    };

    function getMatchResult(player, computer) {
        if (player === computer) return 'draw';
        
        const playerWins = 
            (player === 'rock' && computer === 'scissors') ||
            (player === 'scissors' && computer === 'paper') ||
            (player === 'paper' && computer === 'rock');
            
        return playerWins ? 'win' : 'lose';
    }

    function executeTurn(playerChoice) {
        const computerChoice = options[Math.floor(Math.random() * options.length)];
        const result = getMatchResult(playerChoice, computerChoice);

        if (result === 'win') stats.player++;
        else if (result === 'lose') stats.computer++;

        render(playerChoice, computerChoice, result);
    }

    function render(player, computer, result) {
        logPlayer.textContent = translations[player];
        logComputer.textContent = translations[computer];

        scorePlayerInput.value = stats.player;
        scoreComputerInput.value = stats.computer;

        verdictBox.className = 'verdict-display inset-deep';

        if (result === 'win') {
            verdictBox.textContent = 'Гравець переміг';
            verdictBox.classList.add('verdict-win');
        } else if (result === 'lose') {
            verdictBox.textContent = 'Система перемогла';
            verdictBox.classList.add('verdict-lose');
        } else {
            verdictBox.textContent = 'Нічия';
            verdictBox.classList.add('verdict-draw');
        }
    }

    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            const choice = this.getAttribute('data-choice');
            executeTurn(choice);
        });
    });

    resetBtn.addEventListener('click', () => {
        stats.player = 0;
        stats.computer = 0;
        scorePlayerInput.value = '0';
        scoreComputerInput.value = '0';
        logPlayer.textContent = 'Очікування...';
        logComputer.textContent = 'Очікування...';
        verdictBox.textContent = 'Система готова.';
        verdictBox.className = 'verdict-display inset-deep';
    });
});
