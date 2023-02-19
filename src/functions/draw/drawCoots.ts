import cootsHeight from "../../constants/cootsHeight";
import cootsWidth from "../../constants/cootsWidth";
import timePerCootsFrame from "../../constants/timePerCootsFrame";
import Direction from "../../enums/Direction";
import Coords from "../../interfaces/Coords";
import state from "../../state";
import getCootsCenterScreenCoords from "../getCootsCenterScreenCoords";
import getCootsDirection from "../getCootsDirection";
import drawImage from "./drawImage";
import drawRectangle from "./drawRectangle";

const drawCoots = (): void => {
  const direction: Direction = getCootsDirection();
  const frameDirectionOffset: number = (direction === Direction.DownRight
    ? 1
    : direction === Direction.UpLeft
      ? 2
      : direction === Direction.UpRight
        ? 3
        : 0) * cootsWidth * 4;
  const frameAnimationOffset: number = Math.floor((state.currentTime % (timePerCootsFrame * 4)) / timePerCootsFrame) * cootsWidth;
  const sourceX: number = frameDirectionOffset + frameAnimationOffset;
  const sourceY: number = 0;
  const tileCenterScreenCoords: Coords = getCootsCenterScreenCoords();
  drawImage("coots", sourceX, sourceY, cootsWidth, cootsHeight, tileCenterScreenCoords.x - 9, tileCenterScreenCoords.y - 16, cootsWidth, cootsHeight);
  // drawRectangle("#e03c28", tileCenterScreenCoords.x, tileCenterScreenCoords.y, 1, 1)
};

export default drawCoots;