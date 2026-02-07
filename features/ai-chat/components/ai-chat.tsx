'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { toast } from 'sonner';
import { Send, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import ChatBackground from '@/features/ai-chat/components/chat-background';
import ChatMessages from '@/features/ai-chat/components/chat-messages';
import ChatVisibilityButton from '@/features/ai-chat/components/chat-visibility-button';
import ChatHeader from '@/features/ai-chat/components/chat-header';

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [textInput, setTextInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // V5 HOOK
  const { messages, sendMessage, status } = useChat();
  const isLoading = status === 'streaming' || status === 'submitted';

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (process.env.NEXT_PUBLIC_DEMO_MODE === 'true') {
      toast.error('Demo mode is enabled. Unable to use this feature.', {
        duration: 4000,
      });
      return;
    }

    if (!textInput.trim() || isLoading) return;

    // Send using V5 object format
    sendMessage({ text: textInput });
    setTextInput('');
  };

  return (
    <div className="fixed bottom-4 md:bottom-8 right-0 md:right-8 z-100 font-sans antialiased">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute bottom-20 right-0 w-screen md:w-[400px] h-[500px] md:h-[600px] flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-charcoal-950/90 backdrop-blur-xl shadow-2xl shadow-black/50"
          >
            <ChatHeader setIsOpen={setIsOpen} />

            {/* Messages Area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
            >
              {messages.length === 0 && <ChatBackground />}

              <ChatMessages messages={messages} />

              {isLoading && (
                <div className="flex justify-start w-full">
                  <div className="flex items-center gap-1 px-4 py-3 bg-charcoal-800/50 rounded-2xl rounded-tl-sm border border-white/5">
                    <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-charcoal-900/50 border-t border-white/5 backdrop-blur-md">
              <form
                onSubmit={handleFormSubmit}
                className="relative flex items-center gap-2"
              >
                <div className="relative flex-1 group">
                  <textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        if (textInput.trim() && !isLoading) handleFormSubmit(e);
                      }
                    }}
                    placeholder="Type your technical query..."
                    rows={1}
                    className="w-full bg-black/20 text-sm text-white placeholder-slate-500 px-4 py-3 rounded-xl border border-white/10 focus:border-primary-100/50 focus:bg-black/40 focus:outline-none focus:ring-1 focus:ring-primary-100/20 transition-all resize-none min-h-[44px] max-h-[120px]"
                    style={{ scrollbarWidth: 'thin' }}
                  />
                  <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-1000" />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !textInput.trim()}
                  className="shrink-0 p-3 mb-1 rounded-xl bg-linear-to-br from-primary-100 to-primary-hover text-white shadow-md shadow-orange-900/20 hover:shadow-orange-700/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all active:scale-95"
                >
                  {isLoading ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </form>
              <div className="text-[10px] text-center text-neutral-600 mt-2">
                Powered by gemma-3 &bull; Portofolio AI
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ChatVisibilityButton isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
