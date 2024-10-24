


import { Pokemon } from './Pokemon.js';

export function resetGame(character, enemy, blastoise, logContainer, resetClickCounters) {
    setTimeout(function() {
        character.health = 100;
        enemy.health = 100;
        blastoise.health = 100;
        character.updateHealth();
        enemy.updateHealth();
        blastoise.updateHealth();
        resetClickCounters();
        alert('Игра сброшена! Начните новый бой!');
        logContainer.innerHTML = '';
    }, 2000);
}
