const Evolution = require('./BasicEvolution');
const Types = require('../Types');

module.exports = class Tank extends Evolution {
  static type = Types.Evolution.Tank;
  static level = 5;
  static abilityDuration = 10;
  static abilityCooldown = 60;

  applyAbilityEffects() {
    this.player.sword.damage.multiplier *= 2;
    this.player.sword.knockback.multiplier *= 1.75;
    this.player.knockbackResistance.multiplier *= 2;
    this.player.shape.setScale(1.75);
    this.player.health.regen.multiplier *= 5;

    this.player.health.regenWait.multiplier *= 0;
    this.player.sword.swingDuration.multiplier['ability'] = 0.5;


  }

  update(dt) {
    super.update(dt);

    this.player.speed.multiplier *= 0.75;
    this.player.shape.setScale(1.25);
    this.player.sword.damage.multiplier *= 1.25;
    this.player.sword.knockback.multiplier *= 1.25;
    this.player.knockbackResistance.multiplier *= 2;
    this.player.health.max.multiplier *= 1.6;
    this.player.health.regen.multiplier *= 1.25;
    //TODO: Damagecooldown: 1.1
  }
}
