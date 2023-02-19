import { BaseTexture, Rectangle, Sprite, Texture } from "pixi.js";
import ImageSource from "../../classes/ImageSource";
import getImageSource from "../definables/getImageSource";
import state from "../../state";
import gameWidth from "../../constants/gameWidth";
import gameHeight from "../../constants/gameHeight";
import YSortEntry from "../../interfaces/YSortEntry";

const drawImage = (imageSourceSlug: string, sourceX: number, sourceY: number, sourceWidth: number, sourceHeight: number, x: number, y: number, width: number, height: number, ySortID: string | null): void => {
  const imageSource: ImageSource = getImageSource(imageSourceSlug);
  if (x + width > 0 && x < gameWidth && y + height > 0 && y < gameHeight) {
    const texture: BaseTexture = imageSource.getBaseTexture();
    const chopX: number = Math.max(x * -1, 0);
    const chopY: number = Math.max(y * -1, 0);
    const adjustedX: number = Math.max(x, 0);
    const adjustedY: number = Math.max(y, 0);
    const adjustedWidth: number = Math.min(width - chopX, gameWidth - adjustedX);
    const adjustedHeight: number = Math.min(height - chopY, gameHeight - adjustedY);
    const adjustedSourceX: number = chopX + sourceX;
    const adjustedSourceY: number = chopY + sourceY;
    const adjustedSourceWidth: number = Math.min(sourceWidth - chopX, adjustedWidth);
    const adjustedSourceHeight: number = Math.min(sourceHeight - chopY, adjustedHeight);
    const sprite: Sprite = new Sprite(new Texture(texture, new Rectangle(adjustedSourceX, adjustedSourceY, adjustedSourceWidth, adjustedSourceHeight)));
    sprite.x = adjustedX;
    sprite.y = adjustedY;
    sprite.width = adjustedWidth;
    sprite.height = adjustedHeight;
    if (ySortID) {
      const ySortEntries: YSortEntry[] = state.ySortEntries;
      ySortEntries.push({
        id: ySortID,
        sprite
      });
      state.ySortEntries = ySortEntries;
    }
    else {
      state.app.stage.addChild(sprite);
    }
  }
};

export default drawImage;