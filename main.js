// main.js
import { Pokemon } from './Pokemon.js';
import { logAction } from './log.js';
import { resetGame } from './reset.js';

// Селекторы элементов на странице
const btnKick = document.getElementById('btn-kick');
const btnRandomAttack = document.getElementById('btn-random-attack');
const progressbarCharacter = document.getElementById('progressbar-character');
const healthCharacter = document.getElementById('health-character');
const progressbarEnemy = document.getElementById('progressbar-enemy');
const healthEnemy = document.getElementById('health-enemy');
const progressbarBlastoise = document.getElementById('progressbar-blastoise');
const healthBlastoise = document.getElementById('health-blastoise');
const logContainer = document.getElementById('logs');

// Логи боя
const logs = [
    '[ПЕРСОНАЖ №1] згадав щось важливе, але несподівано [ПЕРСОНАЖ №2] вдарив у передпліччя ворога.',
    '[ПЕРСОНАЖ №1] поперхнувся, і за це [ПЕРСОНАЖ №2] з переляку приклав прямий удар коліном у лоб ворога.',
    '[ПЕРСОНАЖ №1] забувся, але [ПЕРСОНАЖ №2], прийнявши вольове рішення, вдарив.',
    '[ПЕРСОНАЖ №1] прийшов до тями, але [ПЕРСОНАЖ №2] випадково завдав потужного удару.',
    '[ПЕРСОНАЖ №1] поперхнувся, але [ПЕРСОНАЖ №2] розтрощив кулаком супротивника.',
    '[ПЕРСОНАЖ №1] здивувався, а [ПЕРСОНАЖ №2] вліпив підлий удар.',
    '[ПЕРСОНАЖ №1] висморкався, але [ПЕРСОНАЖ №2] провів удар, що дробить.',
    '[ПЕРСОНАЖ №1] похитнувся, і [ПЕРСОНАЖ №2] вдарив у ногу супротивника',
    '[ПЕРСОНАЖ №1] засмутився, як [ПЕРСОНАЖ №2] вдарив стопою в живіт.',
    '[ПЕРСОНАЖ №1] намагався щось сказати, але [ПЕРСОНАЖ №2] розбив брову супернику.'
];

// Создаем объекты для игрока и врагов
const character = new Pokemon('Игрок', healthCharacter, progressbarCharacter);
const enemy = new Pokemon('Charmander', healthEnemy, progressbarEnemy);
const blastoise = new Pokemon('Blastoise', healthBlastoise, progressbarBlastoise);

// Функция для атаки на Charmander и Blastoise
function attackBothEnemies() {
    const damageToEnemy = Math.floor(Math.random() * 20) + 5;
    const damageToBlastoise = Math.floor(Math.random() * 20) + 5;

    enemy.takeDamage(damageToEnemy);
    logAction('Charmander', damageToEnemy, enemy.health, logs, logContainer);
    checkVictory(enemy.health, 'Вы победили Charmander!');

    blastoise.takeDamage(damageToBlastoise);
    logAction('Blastoise', damageToBlastoise, blastoise.health, logs, logContainer);
    checkVictory(blastoise.health, 'Вы победили Blastoise!');
}

// Функция для случайной атаки
function randomAttack() {
    const damage = Math.floor(Math.random() * 15) + 5;
    const target = Math.random() < 0.5 ? enemy : blastoise;

    target.takeDamage(damage);
    logAction(target.name, damage, target.health, logs, logContainer);
    checkVictory(target.health, `Вы победили ${target.name}!`);
}

// Проверка на победу
function checkVictory(health, message) {
    if (health <= 0) {
        alert(message);
        resetGame(character, enemy, blastoise, logContainer, resetClickCounters);
    }
}

// Счетчик кликов
function setupClickCounter(button, limit) {
    let count = 0;

    const handleClick = () => {
        if (count < limit) {
            count++;
            console.log(`Количество нажатий: ${count}`);
        } else {
            alert('Лимит нажатий достигнут!');
            button.disabled = true;
        }
    };

    const reset = () => {
        count = 0;
        button.disabled = false;
        console.log(`Счетчик для кнопки ${button.id} сброшен.`);
    };

    return { handleClick, reset };
}

// Обработчики событий на кнопки
const kickHandler = setupClickCounter(btnKick, 6);
btnKick.addEventListener('click', function() {
    kickHandler.handleClick();
    attackBothEnemies();
});

const randomAttackHandler = setupClickCounter(btnRandomAttack, 6);
btnRandomAttack.addEventListener('click', function() {
    randomAttackHandler.handleClick();
    randomAttack();
});

// Сброс счетчиков кликов
function resetClickCounters() {
    kickHandler.reset();
    randomAttackHandler.reset();
}
