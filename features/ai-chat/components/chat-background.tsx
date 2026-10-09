import { Sparkles } from 'lucide-react';

export default function ChatBackground() {
  return (
    <div
      data-testid="empty-state-background"
      className="flex flex-col items-center justify-center h-full text-center space-y-4 p-8 opacity-60"
    >
      <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-primary-100/20 to-blue-500/20 flex items-center justify-center border border-white/5">
        <Sparkles className="w-8 h-8 text-white/50" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-neutral-200">
          How can I help you?
        </p>
        <p className="text-xs text-neutral-500 max-w-[200px] mx-auto">
          Ask about our engineering services, technical specs, or project
          capabilities.
        </p>
      </div>
    </div>
  );
}
