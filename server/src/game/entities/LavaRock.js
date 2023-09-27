const Entity = require('./Entity');
const Polygon = require('../shapes/Polygon');
const Types = require('../Types');

class LavaRock extends Entity {
  constructor(game, objectData) {
    super(game, Types.Entity.LavaRock, objectData);

    this.density = 3;
    this.shape = Polygon.createFromPoints(0, 0, [
      [0, 0],
      [0.2697841726618705 * this.size, -0.4712230215827338 * this.size],
      [0.7751798561151079 * this.size, -0.46402877697841727 * this.size],
      [0.9712230215827338 * this.size, -0.2823741007194245 * this.size],
      [this.size, -0.09352517985611511 * this.size],
      [0.8741007194244604 * this.size, 0.05935251798561151 * this.size],
      [0.10431654676258993 * this.size, 0.11151079136690648 * this.size],
    ]);
    this.targets.push(Types.Entity.Player, Types.Entity.Rock, Types.Entity.MossyRock, Types.Entity.LavaRock);

    this.spawn();
  }

  processTargetsCollision(entity, response) {
    const selfWeight = this.weight;
    const targetWeight = entity.weight;
    const totalWeight = selfWeight + targetWeight;
    
    const mtv = this.shape.getCollisionOverlap(response);
    const selfMtv = mtv.clone().scale(targetWeight / totalWeight);
    const targetMtv = mtv.clone().scale(selfWeight / totalWeight * -1);

    this.shape.applyCollision(selfMtv);
    entity.shape.applyCollision(targetMtv);
  }

  createState() {
    const state = super.createState();
    state.size = this.size;
    return state;
  }
}

module.exports = LavaRock;
