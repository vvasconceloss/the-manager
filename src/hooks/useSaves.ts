import type { SaveInfo } from "../lib/types";
import { useState, useEffect, useCallback } from "react";
import { listSaves, newGame, loadGame } from "../lib/commands";

export function useSaves() {
  const [loading, setLoading] = useState(true);
  const [saves, setSaves] = useState<SaveInfo[]>([]);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await listSaves();
      setSaves(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const createNewGame = useCallback(
    async (name: string) => {
      try {
        setLoading(true);
        setError(null);
        const save = await newGame(name);
        await load();
        return save;
      } catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        setError(message);
        throw new Error(message);
      } finally {
        setLoading(false);
      }
    },
    [load],
  );

  const loadExistingGame = useCallback(async (path: string) => {
    try {
      setLoading(true);
      setError(null);
      const save = await loadGame(path);
      return save;
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    saves,
    loading,
    error,
    reload: load,
    createNewGame,
    loadExistingGame,
  };
}
