import { useState } from "react";
import { useSaves } from "../hooks/useSaves";
import { Route as rootRoute } from "./__root";
import { useNavigate } from "@tanstack/react-router";
import { createRoute } from "@tanstack/react-router";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/save-menu",
  component: SaveMenu,
});

function SaveMenu() {
  const navigate = useNavigate();
  const { saves, loading, error, createNewGame, loadExistingGame } = useSaves();
  const [newGameName, setNewGameName] = useState("");
  const [showNewGameInput, setShowNewGameInput] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);

  const handleNewGame = async () => {
    if (!newGameName.trim()) return;

    try {
      await createNewGame(newGameName);
      navigate({ to: "/create-manager" });
    } catch {
      // error handled by hook
    }
  };

  const handleLoadGame = async () => {
    try {
      const mostRecentSave = saves[0];
      if (!mostRecentSave) return;

      await loadExistingGame(mostRecentSave.path);
      navigate({ to: "/dashboard" });
    } catch {
      // error handled by hook
    }
  };

  const handleExit = () => {
    window.close();
  };

  return (
    <main className="relative h-screen w-screen bg-linear-to-br from-[#1a1625] via-[#0f0a15] to-[#19181F] bg-cover bg-center select-none">
      <section className="flex items-center justify-center h-full">
        <article className="p-8 flex flex-col justify-center bg-[#19181F] bg-opacity-90 border border-[#1E1E26] rounded-lg shadow-2xl w-160">
          <div className="flex items-center mb-6">
            <svg
              className="w-12 h-12 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <h2 className="text-white text-4xl font-extrabold uppercase ml-4 tracking-wide">
              Career
            </h2>
          </div>
          <p className="text-gray-400 text-base mb-8 leading-relaxed">
            The full featured simulation experience. Manage your team, your way.
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <button
              onClick={handleLoadGame}
              disabled={loading || saves.length === 0}
              className="w-full p-5 flex justify-start items-center gap-4 text-white text-lg font-semibold cursor-pointer
                bg-[#1E1E26] border border-[#1E1E26] rounded-md hover:bg-[#67159C] hover:border-[#67159C] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#1E1E26] disabled:hover:border-[#1E1E26]"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
              {saves.length > 0 ? "Load Game" : "No Saves Found"}
            </button>

            <button
              onClick={() => setShowNewGameInput(!showNewGameInput)}
              className="w-full p-5 flex justify-start items-center gap-4 text-white text-lg font-semibold cursor-pointer
                bg-[#1E1E26] border border-[#1E1E26] rounded-md hover:bg-[#67159C] hover:border-[#67159C] transition-all duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Start New Game
            </button>

            {showNewGameInput && (
              <div className="flex gap-3 animate-in slide-in-from-top-2 duration-200">
                <input
                  type="text"
                  placeholder="Enter save name..."
                  value={newGameName}
                  onChange={(e) => setNewGameName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleNewGame()}
                  className="flex-1 px-4 py-3 bg-[#0d1117] border border-[#1E1E26] rounded-md text-white placeholder-[#484f58]
                    focus:outline-none focus:border-[#67159C] focus:ring-1 focus:ring-[#67159C] transition-colors"
                  autoFocus
                />
                <button
                  onClick={handleNewGame}
                  disabled={loading || !newGameName.trim()}
                  className="px-6 py-3 bg-[#67159C] hover:bg-[#7c3aed] disabled:opacity-50 disabled:cursor-not-allowed rounded-md font-semibold transition-colors"
                >
                  {loading ? "..." : "Create"}
                </button>
              </div>
            )}
          </div>
        </article>
      </section>

      <section className="absolute bottom-6 left-0 right-0 flex justify-center gap-6">
        <a
          href="https://github.com/ovasconceloss"
          target="_blank"
          rel="noopener noreferrer"
          className="w-48 cursor-pointer flex items-center gap-3 text-white text-lg font-normal
            border border-[#19181F] bg-[#1E1E26] hover:bg-[#67159C] hover:border-[#67159C] rounded-lg p-5 px-6 transition-all duration-200"
        >
          <svg
            role="img"
            viewBox="0 0 24 24"
            className="w-6 h-6"
            fill="currentColor"
          >
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
          Github
        </a>

        <button
          onClick={() => setShowExitDialog(true)}
          className="w-48 cursor-pointer flex items-center gap-3 text-white text-lg font-normal
            border border-[#19181F] bg-[#1E1E26] hover:bg-[#67159C] hover:border-[#67159C] rounded-lg p-5 px-6 transition-all duration-200"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Exit
        </button>
      </section>

      {showExitDialog && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setShowExitDialog(false)}
        >
          <article
            className="bg-[#19181F] border border-[#1E1E26] rounded-lg p-8 w-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-white text-2xl font-bold mb-3">
              Are you sure?
            </h3>
            <p className="text-gray-400 mb-6">
              This action will close the game.
            </p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setShowExitDialog(false)}
                className="px-6 py-3 text-white border border-[#67159C] rounded-md hover:bg-[#67159C] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleExit}
                className="px-6 py-3 bg-[#67159C] hover:bg-[#7c3aed] text-white rounded-md transition-colors"
              >
                Exit
              </button>
            </div>
          </article>
        </div>
      )}
    </main>
  );
}
