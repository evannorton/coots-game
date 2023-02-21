import obstacleDuration from "../../constants/obstacleDuration";
import obstacleInvincibleDuration from "../../constants/obstacleInvincibleDuration";
import unitsPerTile from "../../constants/unitsPerTile";
import CollisionType from "../../enums/CollisionType";
import state from "../../state";

const updateCootsPosition = (): void => {
  if (state.hasHitObstacleAt() === false || state.currentTime - state.hitObstacleAt >= obstacleDuration) {
    const collisionVelocityFactor = -.75;
    const leftOffset: number = -.4;
    const topOffset: number = - .5;
    const bottomOffset: number = .85;
    const rightOffset: number = .9;
    const topLeftCoords = {
      x: state.cootsCoords.x + leftOffset * unitsPerTile,
      y: state.cootsCoords.y + topOffset * unitsPerTile
    };
    const topRightCoords = {
      x: topLeftCoords.x + rightOffset * unitsPerTile,
      y: topLeftCoords.y
    };
    const bottomLeftCoords = {
      x: topLeftCoords.x,
      y: topLeftCoords.y + bottomOffset * unitsPerTile
    };
    const bottomRightCoords = {
      x: topRightCoords.x,
      y: bottomLeftCoords.y
    };
    const newX: number = state.cootsCoords.x + Math.floor(state.cootsVelocityX * (state.app.ticker.deltaMS / 1000));
    const newY: number = state.cootsCoords.y + Math.floor(state.cootsVelocityY * (state.app.ticker.deltaMS / 1000));
    const newTopLeftCoords = {
      x: newX + leftOffset * unitsPerTile,
      y: newY + topOffset * unitsPerTile
    };
    const newTopRightCoords = {
      x: newTopLeftCoords.x + rightOffset * unitsPerTile,
      y: newTopLeftCoords.y
    };
    const newBottomLeftCoords = {
      x: newTopLeftCoords.x,
      y: newTopLeftCoords.y + bottomOffset * unitsPerTile
    };
    const newBottomRightCoords = {
      x: newTopRightCoords.x,
      y: newBottomLeftCoords.y
    };
    const xCollision = [
      state.tilemap.getCollisionAtCoords({ x: newTopLeftCoords.x, y: topLeftCoords.y }),
      state.tilemap.getCollisionAtCoords({ x: newBottomLeftCoords.x, y: bottomLeftCoords.y }),
      state.tilemap.getCollisionAtCoords({ x: newTopRightCoords.x, y: topRightCoords.y }),
      state.tilemap.getCollisionAtCoords({ x: newBottomRightCoords.x, y: bottomRightCoords.y })
    ];
    const yCollision = [
      state.tilemap.getCollisionAtCoords({ x: topLeftCoords.x, y: newTopLeftCoords.y }),
      state.tilemap.getCollisionAtCoords({ x: bottomLeftCoords.x, y: newBottomLeftCoords.y }),
      state.tilemap.getCollisionAtCoords({ x: topRightCoords.x, y: newTopRightCoords.y }),
      state.tilemap.getCollisionAtCoords({ x: bottomRightCoords.x, y: newBottomRightCoords.y })
    ];
    const bothCollision = [
      state.tilemap.getCollisionAtCoords({ x: newTopLeftCoords.x, y: newTopLeftCoords.y }),
      state.tilemap.getCollisionAtCoords({ x: newBottomLeftCoords.x, y: newBottomLeftCoords.y }),
      state.tilemap.getCollisionAtCoords({ x: newTopRightCoords.x, y: newTopRightCoords.y }),
      state.tilemap.getCollisionAtCoords({ x: newBottomRightCoords.x, y: newBottomRightCoords.y })
    ];
    const invincible: boolean = state.hasHitObstacleAt() && state.currentTime - state.hitObstacleAt < obstacleInvincibleDuration + obstacleDuration;
    if (invincible === false && xCollision.some((collision) => collision === CollisionType.Obstacle)) {
      state.hitObstacleAt = state.currentTime;
    }
    else if (invincible === false && yCollision.some((collision) => collision === CollisionType.Obstacle)) {
      state.hitObstacleAt = state.currentTime;
    }
    else if (invincible === false && bothCollision.some((collision) => collision === CollisionType.Obstacle)) {
      state.hitObstacleAt = state.currentTime;
    }
    else if (xCollision.some((collision) => collision === CollisionType.Bonk)) {
      state.cootsVelocityX *= collisionVelocityFactor;
    }
    else if (yCollision.some((collision) => collision === CollisionType.Bonk)) {
      state.cootsVelocityY *= collisionVelocityFactor;
    }
    else if (bothCollision.some((collision) => collision === CollisionType.Bonk)) {
      state.cootsVelocityX *= collisionVelocityFactor;
      state.cootsVelocityY *= collisionVelocityFactor;
    }
    else {
      state.cootsCoords = { x: newX, y: newY };
    }
  }
};

export default updateCootsPosition;