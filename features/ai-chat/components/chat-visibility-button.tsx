import { MessageSquare, X } from 'lucide-react';

export default function ChatVisibilityButton({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <button className="max-md:mr-3 hover:scale-110 hover:bg-linear-to-br hover:from-primary-100 hover:to-primary-hover transition-transform duration-200 relative flex items-center justify-center w-14 h-14 bg-charcoal-900 rounded-full border border-white/10 hover:border-primary-100/50">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className=" absolute inset-0 rounded-full bg-charcoal-900 m-px flex items-center justify-center overflow-hidden"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-neutral-200" />
        ) : (
          <MessageSquare className="w-6 h-6 text-primary-100" />
        )}
      </div>

      {/* Status Indicator */}
      {!isOpen && (
        <span className="absolute top-0 right-0 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-charcoal-800"></span>
        </span>
      )}
    </button>
  );
}
