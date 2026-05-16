import { useState } from "react";
import type { Preferences } from "../../lib/preferences";

interface PreferencesModalProps {
  open: boolean;
  initial: Preferences;
  onSave: (prefs: Preferences) => void;
  onClose: () => void;
}

type TabId = "game" | "display" | "simulation";

const tabs: { id: TabId; label: string }[] = [
  { id: "game", label: "Game" },
  { id: "display", label: "Display" },
  { id: "simulation", label: "Simulation" },
];

interface SelectOption<T extends string> {
  value: T;
  label: string;
}

function Select<T extends string>({
  options,
  value,
  onChange,
}: {
  options: SelectOption<T>[];
  value: T;
  onChange: (v: T) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 bg-[#0A0A0B] border border-[#27272A] text-[#FFFFFF] text-[12px] min-w-32.5 justify-between transition-colors duration-100 hover:border-[#60A5FA]/40"
      >
        <span>{options.find((o) => o.value === value)?.label ?? value}</span>
        <svg
          className="w-3 h-3 text-[#71717A]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-20 bg-[#1E1E21] border border-[#27272A] min-w-full shadow-xl">
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-[12px] transition-colors duration-100 ${
                  opt.value === value
                    ? "text-[#FFFFFF] bg-[#2DD4BF]/10"
                    : "text-[#A1A1AA] hover:bg-[#1A1A1D] hover:text-[#FFFFFF]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const autoSaveOptions: SelectOption<Preferences["autoSave"]>[] = [
  { value: "matchday", label: "Every matchday" },
  { value: "monthly", label: "Every month" },
  { value: "manual", label: "Manual only" },
];

const backupOptions: SelectOption<string>[] = [
  { value: "3", label: "3 backups" },
  { value: "5", label: "5 backups" },
  { value: "10", label: "10 backups" },
];

const onOffOptions: SelectOption<"on" | "off">[] = [
  { value: "on", label: "On" },
  { value: "off", label: "Off" },
];

const windowModeOptions: SelectOption<Preferences["windowMode"]>[] = [
  { value: "windowed", label: "Windowed" },
  { value: "fullscreen", label: "Fullscreen" },
  { value: "borderless", label: "Borderless" },
];

const detailOptions: SelectOption<Preferences["simulationDetail"]>[] = [
  { value: "fast", label: "Fast" },
  { value: "normal", label: "Normal" },
  { value: "detailed", label: "Detailed" },
];

function PreferenceRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-3 px-5">
      <span className="text-[#A1A1AA] text-[13px]">{label}</span>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

export function PreferencesModal({
  open,
  initial,
  onSave,
  onClose,
}: PreferencesModalProps) {
  const [activeTab, setActiveTab] = useState<TabId>("game");
  const [prefs, setPrefs] = useState<Preferences>({ ...initial });

  if (!open) return null;

  const update = <K extends keyof Preferences>(
    key: K,
    value: Preferences[K],
  ) => {
    setPrefs((prev) => ({ ...prev, [key]: value }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "game":
        return (
          <div className="flex flex-col">
            <PreferenceRow label="Auto-save frequency">
              <Select
                options={autoSaveOptions}
                value={prefs.autoSave}
                onChange={(v) => update("autoSave", v)}
              />
            </PreferenceRow>
            <div className="border-t border-[#27272A]/50 mx-5" />
            <PreferenceRow label="Auto-save backups">
              <Select
                options={backupOptions}
                value={String(prefs.autoSaveBackups)}
                onChange={(v) =>
                  update("autoSaveBackups", Number(v) as 3 | 5 | 10)
                }
              />
            </PreferenceRow>
            <div className="border-t border-[#27272A]/50 mx-5" />
            <PreferenceRow label="Confirm before exit">
              <Select
                options={onOffOptions}
                value={prefs.confirmOnExit ? "on" : "off"}
                onChange={(v) => update("confirmOnExit", v === "on")}
              />
            </PreferenceRow>
            <div className="border-t border-[#27272A]/50 mx-5" />
            <PreferenceRow label="Show tips on startup">
              <Select
                options={onOffOptions}
                value={prefs.showTips ? "on" : "off"}
                onChange={(v) => update("showTips", v === "on")}
              />
            </PreferenceRow>
            <div className="border-t border-[#27272A]/50 mx-5" />
            <PreferenceRow label="Skip intro animation">
              <Select
                options={onOffOptions}
                value={prefs.skipIntro ? "on" : "off"}
                onChange={(v) => update("skipIntro", v === "on")}
              />
            </PreferenceRow>
          </div>
        );
      case "display":
        return (
          <div className="flex flex-col">
            <PreferenceRow label="Window mode">
              <Select
                options={windowModeOptions}
                value={prefs.windowMode}
                onChange={(v) => update("windowMode", v)}
              />
            </PreferenceRow>
          </div>
        );
      case "simulation":
        return (
          <div className="flex flex-col">
            <PreferenceRow label="Match detail">
              <Select
                options={detailOptions}
                value={prefs.simulationDetail}
                onChange={(v) => update("simulationDetail", v)}
              />
            </PreferenceRow>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0A0A0B] flex items-center justify-center z-50">
      <div className="flex flex-col w-145 h-105 bg-[#141416] border border-[#27272A]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#27272A]">
          <h2 className="text-[#FFFFFF] text-[16px] font-semibold uppercase tracking-widest">
            Preferences
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

        {/* Tab bar */}
        <nav className="flex px-5 border-b border-[#27272A]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-[12px] font-semibold uppercase tracking-widest border-b-2 transition-colors duration-100 ${
                activeTab === tab.id
                  ? "text-[#FFFFFF] border-[#2DD4BF]"
                  : "text-[#71717A] border-transparent hover:text-[#A1A1AA]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-2">{renderTabContent()}</div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-5 py-3 border-t border-[#27272A]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[#FFFFFF] text-[13px] border border-[#27272A] hover:bg-[#1A1A1D] transition-colors duration-100"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(prefs)}
            className="px-5 py-2 bg-[#2DD4BF] hover:brightness-110 text-[#0A0A0B] text-[13px] font-semibold transition-all duration-100"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
}
