import gameHeight from "../constants/gameHeight";
import gameWidth from "../constants/gameWidth";
import state from "../state";
import assetsAreLoaded from "./assetsAreLoaded";
import getTilemap from "./definables/getTilemap";
import drawCoots from "./draw/drawCoots";
import drawRectangle from "./draw/drawRectangle";

const render = (): void => {
  if (assetsAreLoaded()) {
    state.app.stage.removeChildren();
    drawRectangle("#000000", 0, 0, gameWidth, gameHeight);
    getTilemap("map").draw();
    drawCoots();
    state.app.stage.sortChildren();
    state.app.render();
  }
};

export default render;