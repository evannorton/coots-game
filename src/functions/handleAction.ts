import AudioSource from "../classes/AudioSource";
import levels from "../constants/levels";
import state from "../state";
import attemptScratch from "./attemptScratch";
import getAudioSource from "./definables/getAudioSource";
import isCatStarving from "./isCatStarving";
import levelIsCompleted from "./levelIsCompleted";
import startLevel from "./startLevel";

const handleAction = (): void => {
  if (state.isAtTitle) {
    document.getElementById("screen")?.classList.remove("title");
    const titleMusic: AudioSource = getAudioSource("music/title");
    const mainMusic: AudioSource = getAudioSource("music/main");
    state.isAtTitle = false;
    titleMusic.stop();
    mainMusic.play(null, null);
    startLevel();
  }
  else if (isCatStarving()) {
    document.getElementById("screen")?.classList.remove("defeat");
    startLevel();
  }
  else if (levelIsCompleted()) {
    document.getElementById("screen")?.classList.remove("level");
    const levelIndex = levels.findIndex((level) => level === state.level);
    const newLevel = levels[levelIndex + 1];
    if (newLevel) {
      state.level = newLevel;
      startLevel();
    }
    else {
      state.won = true;
    }
  }
  else {
    attemptScratch();
  }
}

export default handleAction;