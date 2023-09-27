const Biome = require('./Biome');
const Types = require('../Types');

class Safezone extends Biome {
  constructor(game, shape) {
    super(game, Types.Biome.Safezone, shape);
    this.bushesCount = 50;
    this.coinsCollectLimit = 2000;
  }

  initialize(biomeData) {
    super.initialize(biomeData);

    const step = Math.PI * 2 / this.bushesCount;
    for (let i = 0; i < this.bushesCount; i++) {
      const angle = i * step;
      const size = 150 + Math.random() * 250;
      this.game.map.addEntity({
        type: Types.Entity.Bush,
        position: [
          Math.cos(angle) * this.shape.radius,
          Math.sin(angle) * this.shape.radius,
        ],
        size,
      });
    }
  }

  collides(player, response) {
    if (player.inSafezone) {
      if (player.levels.coins >= this.coinsCollectLimit) {
        this.game.map.shape.randomSpawnInside(player.shape);
      } else {
        player.biomes.add(this.type);
      }
    } else {
      const mtv = this.shape.getCollisionOverlap(response);
      player.shape.applyCollision(mtv);
    }
  }
}

module.exports = Safezone;
