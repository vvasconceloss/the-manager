export interface Preferences {
  autoSave: "matchday" | "monthly" | "manual";
  autoSaveBackups: 3 | 5 | 10;
  confirmOnExit: boolean;
  showTips: boolean;
  windowMode: "windowed" | "fullscreen" | "borderless";
  simulationDetail: "fast" | "normal" | "detailed";
  skipIntro: boolean;
}

export const defaultPreferences: Preferences = {
  autoSave: "matchday",
  autoSaveBackups: 5,
  confirmOnExit: true,
  showTips: true,
  windowMode: "windowed",
  simulationDetail: "normal",
  skipIntro: false,
};

const STORAGE_KEY = "the-manager-preferences";

export function loadPreferences(): Preferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...defaultPreferences, ...parsed };
    }
  } catch {
    // ignore and return defaults
  }
  return { ...defaultPreferences };
}

export function savePreferences(prefs: Preferences): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // storage unavailable
  }
}
