import { useState, useCallback } from "react";
import { exit } from "@tauri-apps/plugin-process";
import { useNavigate, createRoute } from "@tanstack/react-router";
import {
  IconBulbFilled,
  IconSettings,
  IconBallFootball,
} from "@tabler/icons-react";
import { useSaves } from "../hooks/useSaves";
import { Route as rootRoute } from "./__root";
import type { Preferences } from "../lib/preferences";
import { useAppVersion } from "../hooks/useAppVersion";
import { useGameLoader } from "../hooks/useGameLoader";
import { useRotatingTips } from "../hooks/useRotatingTips";
import { MenuButton } from "../components/save-menu/menu-button";
import { ExitDialog } from "../components/save-menu/exit-dialog";
import { loadPreferences, savePreferences } from "../lib/preferences";
import { LoadGameModal } from "../components/save-menu/load-game-modal";
import { PreferencesModal } from "../components/save-menu/preferences-modal";
import { RecentGameButton } from "../components/save-menu/recent-game-button";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/save-menu",
  component: SaveMenu,
});

function SaveMenu() {
  const navigate = useNavigate();
  const { saves, loading, error, loadExistingGame } = useSaves();
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<Preferences>(() =>
    loadPreferences(),
  );
  const [showLoadModal, setShowLoadModal] = useState(false);

  const appVersion = useAppVersion();
  const { loadingPath, loadGame } = useGameLoader(loadExistingGame);
  const recentSave = saves.length > 0 ? saves[0] : null;
  const isAppLoading = loading || loadingPath !== null;
  const tip = useRotatingTips(saves.length > 0);

  const handleRecentGame = useCallback(async () => {
    if (!recentSave) return;
    await loadGame(recentSave.path);
  }, [recentSave, loadGame]);

  const handleLoadGame = useCallback(
    async (path: string) => {
      await loadGame(path, () => setShowLoadModal(false));
    },
    [loadGame],
  );

  const handleNewGame = useCallback(() => {
    navigate({ to: "/create-manager" });
  }, [navigate]);

  const handleExit = useCallback(async () => {
    await exit(0);
  }, []);

  return (
    <main className="relative h-screen w-screen bg-[#0A0A0B] bg-[url('/tm_main_menu_bg.png')] bg-cover bg-center select-none flex flex-col">
      <div className="absolute inset-0 bg-grain pointer-events-none" />
      <header className="relative z-10 shrink-0 px-8 py-5 flex items-center justify-between">
        <div>
          <h2 className="text-[#FFFFFF] uppercase text-5xl font-heading font-bold">
            The
          </h2>
          <h2 className="text-[#FFFFFF] uppercase text-5xl font-heading font-bold">
            Manager
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPreferences(true)}
            className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 bg-[#141416] border border-[#27272A] hover:bg-[#1A1A1D] hover:border-[#60A5FA]/40 rounded-xs transition-colors duration-100"
          >
            <IconSettings className="w-3.5 h-3.5 text-[#FFFFFF]" />
            <span className="text-[#FFFFFF] text-[12px] uppercase">
              Preferences
            </span>
          </button>
        </div>
      </header>
      <section className="relative z-10 flex-1 flex items-center justify-center px-8">
        <article className="flex flex-col w-130">
          {error && (
            <div className="mb-4 p-3 bg-[#FB7185]/10 border border-[#FB7185]/20 rounded-xs text-[#FB7185] text-[13px]">
              {error}
            </div>
          )}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-1">
              <IconBallFootball className="w-5 h-5 text-[#FFFFFF]" />
              <span className="text-[#FFFFFF] text-xl font-semibold uppercase">
                Career
              </span>
            </div>
            {recentSave ? (
              <RecentGameButton
                save={recentSave}
                loading={loadingPath === "recent"}
                disabled={isAppLoading}
                onClick={handleRecentGame}
              />
            ) : !loading && saves.length === 0 ? (
              <div className="w-full p-5 bg-[#141416] border border-[#27272A] rounded-xs">
                <h2 className="text-[#FFFFFF] text-[16px] font-bold uppercase tracking-widest">
                  Welcome
                </h2>
                <p className="text-[#A1A1AA] text-[13px] mt-2 leading-relaxed">
                  Build your squad, set your tactics, and lead your team to
                  glory.
                </p>
                <p className="text-[#71717A] text-[12px] mt-3">
                  Start by creating a new game below.
                </p>
              </div>
            ) : (
              <RecentGameButton
                save={recentSave}
                loading={loadingPath === "recent"}
                disabled={isAppLoading}
                onClick={handleRecentGame}
              />
            )}
            <div className="grid grid-cols-2 gap-3">
              <MenuButton
                onClick={handleNewGame}
                disabled={isAppLoading}
                variant="info"
              >
                New Game
              </MenuButton>
              <MenuButton
                onClick={() => setShowLoadModal(true)}
                disabled={isAppLoading || saves.length === 0}
                variant="info"
              >
                Load Game
              </MenuButton>
            </div>
            <MenuButton
              onClick={() => setShowExitDialog(true)}
              variant="danger"
            >
              Exit
            </MenuButton>
          </div>
          <div className="mt-6 p-2 bg-[#141416]/60 border border-[#18181B]">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="flex items-center justify-center w-5 h-5 rounded-xs">
                <IconBulbFilled className="w-3.5 h-3.5 text-white" />
              </span>
              <span className="text-[#A1A1AA] text-[11px] font-semibold uppercase tracking-widest">
                Tip
              </span>
            </div>
            <p
              key={tip}
              className="text-[#A1A1AA] text-[13px] leading-relaxed animate-in fade-in duration-300"
            >
              {tip}
            </p>
          </div>
        </article>
      </section>
      <footer className="relative z-10 shrink-0 px-8 py-3 flex items-center justify-between">
        <span className="text-[#3F3F46] text-xl">v{appVersion || "0.1.0"}</span>
      </footer>
      <PreferencesModal
        open={showPreferences}
        initial={preferences}
        onSave={(prefs) => {
          savePreferences(prefs);
          setPreferences(prefs);
          setShowPreferences(false);
        }}
        onClose={() => setShowPreferences(false)}
      />
      <ExitDialog
        open={showExitDialog}
        onClose={() => setShowExitDialog(false)}
        onExit={handleExit}
      />
      <LoadGameModal
        open={showLoadModal}
        onClose={() => setShowLoadModal(false)}
        saves={saves}
        loading={loading}
        loadingPath={loadingPath}
        onLoadGame={handleLoadGame}
      />
    </main>
  );
}
