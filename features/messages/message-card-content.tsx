'use client';

import { cn } from '@/lib/utils';
import { CardContent } from '@/components/ui/card';

import { useState } from 'react';
import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Message } from './types';

export default function MessageCardContent({ message }: { message: Message }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CardContent className="px-2">
      {/* --- MESSAGE TITLE --- */}
      <div className="mb-1">
        <h4 className="text-sm text-center font-semibold text-slate-800 uppercase tracking-wide">
          Message
        </h4>
      </div>

      {/* --- MESSAGE CONTENT --- */}
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div
          className={cn(
            'text-sm leading-relaxed text-slate-600 transition-all duration-300 bg-slate-50/50 rounded-lg px-3.5 py-1 border border-slate-100',
            !isOpen && 'line-clamp-3',
          )}
        >
          <p className="text-justify">
            {message.message}
          </p>
        </div>

        {/* --- SHOW MORE/LESS BUTTON --- */}
        <div className="flex justify-center mt-2">
          <CollapsibleTrigger asChild>
            <button className="cursor-pointer rounded-md font-medium text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 flex items-center gap-1.5 transition-all duration-200">
              {isOpen ? 'Show less' : 'Show more'}
              {isOpen ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </CollapsibleTrigger>
        </div>
      </Collapsible>
    </CardContent>
  );
}
