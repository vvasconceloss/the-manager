import { useState } from "react";
import { File } from "lucide-react";
import { formatDate } from "../../lib/format";
import type { SaveInfo } from "../../lib/types";

interface LoadGameModalProps {
  open: boolean;
  onClose: () => void;
  saves: SaveInfo[];
  loading: boolean;
  loadingPath: string | null;
  onLoadGame: (path: string) => void;
}

export function LoadGameModal({
  open,
  onClose,
  saves,
  loading,
  loadingPath,
  onLoadGame,
}: LoadGameModalProps) {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  if (!open) return null;

  const selectedSave = saves.find((s) => s.path === selectedPath);

  return (
    <div
      className="fixed inset-0 bg-[#0A0A0B] flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="flex flex-col w-220 h-150 bg-[#141416] border border-[#27272A]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#27272A]">
          <h2 className="text-[#FFFFFF] text-[16px] font-semibold uppercase tracking-widest">
            Load Game
          </h2>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center text-[#71717A] hover:text-[#FFFFFF] transition-colors duration-100"
            aria-label="Close"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex-1 flex min-h-0">
          <div className="w-[320px] shrink-0 border-r border-[#27272A] flex flex-col">
            <div className="px-4 py-3 border-b border-[#27272A]">
              <span className="text-[#A1A1AA] text-[11px] uppercase tracking-widest font-semibold">
                Saves
              </span>
            </div>
            <div className="flex-1 overflow-y-auto">
              {loading && saves.length === 0 && (
                <div className="flex items-center justify-center h-32 text-[#71717A] text-[13px]">
                  Loading saves...
                </div>
              )}
              {!loading && saves.length === 0 && (
                <div className="flex items-center justify-center h-32 text-[#71717A] text-[13px]">
                  No saves found.
                </div>
              )}
              {saves.map((save) => {
                const isSelected = selectedPath === save.path;
                return (
                  <button
                    key={save.path}
                    onClick={() => setSelectedPath(save.path)}
                    disabled={loadingPath !== null}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-100 disabled:opacity-50 disabled:cursor-not-allowed ${
                      isSelected
                        ? "bg-[#2DD4BF]/10 border-l-2 border-[#2DD4BF]"
                        : "border-l-2 border-transparent hover:bg-[#1A1A1D]"
                    }`}
                  >
                    <File className="w-4 h-4 text-[#60A5FA] shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[#FFFFFF] text-[13px] font-medium truncate">
                        {save.name}
                      </div>
                      <div className="text-[#71717A] text-[11px] truncate mt-0.5">
                        {formatDate(save.modified_at)}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <div className="px-5 py-3 border-b border-[#27272A]">
              <span className="text-[#A1A1AA] text-[11px] uppercase tracking-widest font-semibold">
                Preview
              </span>
            </div>
            <div className="flex-1 flex items-center justify-center p-6">
              {selectedSave ? (
                <div className="w-full max-w-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <File className="w-10 h-10 text-[#60A5FA]" />
                    <div>
                      <h3 className="text-[#FFFFFF] text-[18px] font-bold truncate">
                        {selectedSave.name}
                      </h3>
                      <span className="text-[#71717A] text-[12px]">
                        Save file
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-[#27272A]/50">
                      <span className="text-[#71717A] text-[12px]">
                        Full path
                      </span>
                      <span className="text-[#A1A1AA] text-[12px] text-right max-w-50 truncate">
                        {selectedSave.path}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#27272A]/50">
                      <span className="text-[#71717A] text-[12px]">
                        Last modified
                      </span>
                      <span className="text-[#A1A1AA] text-[12px]">
                        {formatDate(selectedSave.modified_at)}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-[#71717A] text-[13px] text-center">
                  Select a save to preview
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between px-5 py-3 border-t border-[#27272A]">
          <span className="text-[#3F3F46] text-[12px]">
            {saves.length} save{saves.length !== 1 ? "s" : ""}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-[#FFFFFF] text-[13px] border border-[#27272A] hover:bg-[#1A1A1D] transition-colors duration-100"
            >
              Cancel
            </button>
            <button
              onClick={() => selectedPath && onLoadGame(selectedPath)}
              disabled={!selectedPath || loadingPath !== null}
              className="px-5 py-2 bg-[#2DD4BF] hover:brightness-110 text-[#0A0A0B] text-[13px] font-semibold transition-all duration-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loadingPath === selectedPath ? "Loading..." : "Load Game"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
