import type { SaveInfo } from "../lib/types";
import { useState, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";

export function useGameLoader(
  loadExistingGame: (path: string) => Promise<SaveInfo>,
) {
  const navigate = useNavigate();
  const [loadingPath, setLoadingPath] = useState<string | null>(null);

  const loadGame = useCallback(
    async (path: string, afterLoad?: () => void) => {
      setLoadingPath(path);
      try {
        await loadExistingGame(path);
        afterLoad?.();
        navigate({ to: "/dashboard" });
      } catch {
      } finally {
        setLoadingPath(null);
      }
    },
    [loadExistingGame, navigate],
  );

  return { loadingPath, loadGame };
}
