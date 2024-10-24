

export class Pokemon {
    constructor(name, healthElement, progressbarElement) {
        this.name = name;
        this.health = 100;
        this.healthText = healthElement;
        this.progressbar = progressbarElement;
    }

    updateHealth() {
        const healthPercentage = (this.health / 100) * 100;
        this.progressbar.style.width = `${healthPercentage}%`;
        this.healthText.textContent = `${this.health} / 100`;
    }

    takeDamage(damage) {
        this.health = Math.max(0, this.health - damage);
        this.updateHealth();
    }
}
