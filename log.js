



export function logAction(target, damage, remainingHealth, logs, logContainer) {
    const logText = `${target} получил ${damage} урона, осталось ${remainingHealth} HP.`;
    const randomLog = logs[Math.floor(Math.random() * logs.length)];
    const formattedLog = randomLog.replace('[ПЕРСОНАЖ №1]', 'Игрок').replace('[ПЕРСОНАЖ №2]', target);

    const newLogEntry = `<p>${formattedLog} (${logText})</p>`;
    logContainer.innerHTML = newLogEntry + logContainer.innerHTML;
}
