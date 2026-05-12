export interface TauriError {
  message: string;
}

export const isTauriError = (e: unknown): e is TauriError =>
  typeof e === "object" && e !== null && "message" in e;
