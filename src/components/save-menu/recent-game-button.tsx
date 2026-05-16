import type { SaveInfo } from "../../lib/types";
import { relativeTime } from "../../lib/format";

interface RecentGameButtonProps {
  save: SaveInfo | null;
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
}

export function RecentGameButton({
  save,
  disabled = false,
  loading = false,
  onClick,
}: RecentGameButtonProps) {
  if (!save) {
    return <></>;
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="cursor-pointer group w-full flex items-center gap-5 p-5 bg-[#141416] border border-[#27272A] hover:border-[#2DD4BF] rounded-xs transition-colors duration-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[#27272A]"
    >
      <div className="shrink-0 w-1 h-15 rounded-full bg-[#2DD4BF]/30 group-hover:bg-[#2DD4BF]/60 transition-colors duration-100" />
      <div className="flex-1 min-w-0 text-left">
        <span className="text-[#A1A1AA] text-[12px] font-medium uppercase tracking-wider">
          Resume Career
        </span>
        <div className="text-[#FFFFFF] text-[20px] font-bold truncate">
          {save.name}
        </div>
        <div className="flex items-center gap-3 mt-1.5">
          <span className="text-[#71717A] text-[13px]">
            Played {relativeTime(save.modified_at)}
          </span>
        </div>
        <div className="text-[#3F3F46] text-[11px] truncate mt-1">
          {save.path}
        </div>
      </div>

      {loading && (
        <span className="text-[#A1A1AA] text-[13px] shrink-0">Loading...</span>
      )}
    </button>
  );
}
