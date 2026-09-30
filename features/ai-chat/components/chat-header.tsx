import { Bot, X } from 'lucide-react';

export default function ChatHeader({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <div className="relative flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-orange-600/20 ring-1 ring-primary-100/50">
          <Bot className="w-5 h-5 text-primary-100" />
          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-charcoal-950 animate-pulse" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wide">
            Qualtec AI Assistant
          </h3>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider">
              System Online
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={() => setIsOpen(false)}
        aria-label="Close chat window"
        className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
      >
        <X size={18} />
      </button>
    </div>
  );
}
