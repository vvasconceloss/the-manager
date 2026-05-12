import { invoke } from "@tauri-apps/api/core";
import type { SaveInfo, GameState } from "./types";

export async function listSaves(): Promise<SaveInfo[]> {
  return invoke<SaveInfo[]>("list_saves");
}

export async function newGame(name: string): Promise<SaveInfo> {
  return invoke<SaveInfo>("new_game", { name });
}

export async function loadGame(path: string): Promise<SaveInfo> {
  return invoke<SaveInfo>("load_game", { path });
}

export async function getGameState(): Promise<GameState> {
  return invoke<GameState>("get_game_state");
}
