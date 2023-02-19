import gameHeight from "../constants/gameHeight";
import gameWidth from "../constants/gameWidth";
import state from "../state";
import assetsAreLoaded from "./assetsAreLoaded";
import getImageSourcesCount from "./definables/getImageSourcesCount";
import drawCoots from "./draw/drawCoots";
import drawRectangle from "./draw/drawRectangle";

const render = (): void => {
  state.app.stage.removeChildren();
  drawRectangle("#000000", 0, 0, gameWidth, gameHeight);
  if (assetsAreLoaded()) {
    state.tilemap.draw();
    drawCoots();
  }
  else {
    const current: number = state.loadedAssets;
    const total: number = getImageSourcesCount();
    const percent: number = current / total;
    const width: number = 192;
    const x: number = (gameWidth - width) / 2;
    const height: number = 32;
    const y: number = (gameHeight - height) / 2;
    drawRectangle("#343434", x, y, width, height);
    drawRectangle("#7b7b7b", x, y, Math.round(width * percent), height);
  }
  const entryYs: Map<string, number> = new Map;
  for (const entry of state.ySortEntries) {
    const mappedY = entryYs.get(entry.id);
    if (!mappedY || entry.sprite.y > mappedY) {
      entryYs.set(entry.id, Math.max(entry.sprite.y, 0))
    }
  }
  for (const entry of state.ySortEntries) {
    const y = entryYs.get(entry.id);
    if (y) {
      const zIndex = y + entry.sprite.height / 2;
      if (zIndex) {
        entry.sprite.zIndex = zIndex;
      }
      state.app.stage.addChild(entry.sprite)
    }
  }
  state.app.stage.sortChildren();
  state.app.render();
  state.ySortEntries = [];
};

export default render;