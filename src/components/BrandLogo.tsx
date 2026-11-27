import React, { useState } from 'react';

interface BrandLogoProps {
  onClick?: () => void;
  compact?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ onClick, compact = false }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center gap-3 text-left focus:outline-none"
      title="MEALANCE · Inicio"
    >
      {!imgError ? (
        <img
          src={`${import.meta.env.BASE_URL}logo.png`}
          alt="MEALANCE Logo"
          onError={() => setImgError(true)}
          className="h-10 w-10 rounded-xl object-contain bg-emerald-50 border border-emerald-200/70 p-1 shadow-sm transition-transform group-hover:scale-105"
        />
      ) : (
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] text-white shadow-sm transition-transform group-hover:scale-105">
          {/* Minimalist SVG fallback: Zero-waste leaf + plate cycle + coral tomato accent */}
          <svg
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <circle
              cx="14"
              cy="14"
              r="10"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeDasharray="48 14"
            />
            <path
              d="M14 8.5C10.8 8.5 8.5 11 8.5 14.2C8.5 16.9 10.6 19.2 13.5 19.4C16.8 19.6 19.5 16.8 19.5 12.8V9.2C19.5 8.8 19.2 8.5 18.8 8.5H14Z"
              fill="white"
              fillOpacity="0.22"
              stroke="white"
              strokeWidth="1.9"
              strokeLinejoin="round"
            />
            <path
              d="M11.5 16.5L16.5 11.5"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          {/* Coral Tomato strategic dot */}
          <span
            className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#EF4444] ring-2 ring-white"
            title="0% Desperdicio"
          />
        </div>
      )}

      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="font-heading text-lg font-extrabold tracking-tight text-[#0F172A] sm:text-xl">
            MEAL<span className="text-[#10B981]">ANCE</span>
          </span>
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#10B981] border border-emerald-200/80">
            0% Waste
          </span>
        </div>
        {!compact && (
          <span className="text-[11px] font-medium text-slate-500 sm:text-xs">
            Menús inteligentes · Desperdicio cero
          </span>
        )}
      </div>
    </button>
  );
};
