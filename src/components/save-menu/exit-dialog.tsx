interface ExitDialogProps {
  open: boolean;
  onExit: () => void;
  onClose: () => void;
}

export function ExitDialog({ open, onClose, onExit }: ExitDialogProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-in fade-in duration-100"
      onClick={onClose}
    >
      <article
        className="bg-[#1E1E21] border border-[#27272A] rounded-xs w-100 shadow-xl animate-in fade-in zoom-in-95 duration-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 pb-0">
          <div className="flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <h2 className="text-[#FFFFFF] text-[18px] font-bold leading-tight uppercase">
                Exit Game
              </h2>
              <p className="text-[#A1A1AA] text-[13px] mt-1.5 leading-relaxed">
                Any unsaved progress will be lost. Are you sure you want to
                close the application?
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-4 pb-6 px-6 border-t border-[#27272A] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="w-20 px-5 py-2 text-[#FFFFFF] cursor-pointer text-[13px] border border-[#27272A] rounded-xs hover:bg-[#1A1A1D] transition-colors duration-100"
          >
            Cancel
          </button>
          <button
            onClick={onExit}
            className="w-20 px-5 py-2 bg-[#FB7185] cursor-pointer hover:brightness-110 text-[#FFFFFF] text-[13px] font-semibold rounded-xs transition-all duration-100"
          >
            Exit
          </button>
        </div>
      </article>
    </div>
  );
}
