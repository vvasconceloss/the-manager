interface MenuButtonProps {
  onClick: () => void;
  disabled?: boolean;
  variant: "primary" | "info" | "danger";
  subtitle?: string;
  children: string;
}

const variantStyles = {
  primary: {
    borderHover: "hover:border-[#2DD4BF]",
    indicator: "bg-[#2DD4BF]",
  },
  info: {
    borderHover: "hover:border-[#60A5FA]",
    indicator: "bg-[#60A5FA]",
  },
  danger: {
    borderHover: "hover:border-[#FB7185]",
    indicator: "bg-[#FB7185]",
  },
} as const;

export function MenuButton({
  onClick,
  disabled = false,
  variant,
  subtitle,
  children,
}: MenuButtonProps) {
  const v = variantStyles[variant];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer flex flex-col items-center justify-center gap-2 p-5 bg-[#141416] border border-[#27272A] ${v.borderHover} rounded-xs transition-colors duration-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[#27272A]`}
    >
      <span className="text-[#FFFFFF] text-[15px] font-semibold leading-tight text-center uppercase">
        {children}
      </span>
      {subtitle && (
        <span className="text-[#71717A] text-[12px] leading-tight text-center">
          {subtitle}
        </span>
      )}
      <div className={`w-10 h-0.5 rounded-full ${v.indicator}`} />
    </button>
  );
}
