export interface SaveInfo {
  name: string;
  path: string;
  modified_at: string;
}

export interface GameState {
  current_date: string;
  season_id: number;
  user_club_id: number;
  user_staff_id: number;
}

export type AppError =
  | { type: "NoSaveLoaded"; message: string }
  | { type: "LockPoisoned"; message: string }
  | { type: "SaveNotFound"; message: string }
  | { type: "Domain"; message: string }
  | { type: "Database"; message: string }
  | { type: "Io"; message: string }
  | { type: "Migration"; message: string };
