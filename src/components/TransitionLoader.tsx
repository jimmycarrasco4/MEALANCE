import React, { useEffect, useState } from 'react';
import { CheckCircle2, Recycle, Sparkles } from 'lucide-react';

interface TransitionLoaderProps {
  onComplete: () => void;
}

const ROTATING_MESSAGES = [
  'Ajustando tus macros...',
  'Filtrando alergias...',
  'Entrelazando ingredientes para 0% desperdicio...'
];

export const TransitionLoader: React.FC<TransitionLoaderProps> = ({ onComplete }) => {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(18);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setMsgIndex(1);
      setProgress(58);
    }, 500);

    const t2 = setTimeout(() => {
      setMsgIndex(2);
      setProgress(96);
    }, 1000);

    const t3 = setTimeout(() => {
      setProgress(100);
      onComplete();
    }, 1500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div className="mx-auto flex min-h-[75vh] max-w-md flex-col items-center justify-center px-6 text-center animate-fade-in-up">
      <div className="relative flex h-24 w-24 items-center justify-center">
        <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400/20" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#10B981] to-[#059669] text-white shadow-emerald-glow">
          <Recycle className="h-10 w-10 animate-spin" style={{ animationDuration: '2.4s' }} />
        </div>
        <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#EF4444] text-sm text-white shadow-md ring-2 ring-white">
          🍅
        </span>
      </div>

      <div className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-[#10B981] border border-emerald-200">
        <Sparkles className="h-3.5 w-3.5" />
        <span>Motor MEALANCE Zero-Waste</span>
      </div>

      <h2 className="mt-4 font-heading text-xl font-extrabold text-[#0F172A] sm:text-2xl">
        {ROTATING_MESSAGES[msgIndex]}
      </h2>

      {/* Smooth Progress Bar */}
      <div className="mt-5 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#10B981] via-emerald-500 to-[#EF4444] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Checklist of rotating steps */}
      <div className="mt-6 w-full space-y-2.5 rounded-2xl border border-[#E2E8F0] bg-white p-4 text-left shadow-soft">
        {ROTATING_MESSAGES.map((text, idx) => {
          const isDone = idx < msgIndex;
          const isCurrent = idx === msgIndex;
          return (
            <div
              key={text}
              className={`flex items-center gap-2.5 text-xs font-medium transition-opacity ${
                isDone || isCurrent ? 'opacity-100' : 'opacity-40'
              }`}
            >
              <CheckCircle2
                className={`h-4 w-4 shrink-0 ${
                  isDone
                    ? 'text-[#10B981]'
                    : isCurrent
                    ? 'text-[#EF4444] animate-pulse'
                    : 'text-slate-300'
                }`}
              />
              <span
                className={
                  isCurrent
                    ? 'font-bold text-[#0F172A]'
                    : isDone
                    ? 'text-slate-600'
                    : 'text-slate-400'
                }
              >
                {text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
