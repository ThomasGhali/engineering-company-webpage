import { CardDescription, CardHeader } from '@/components/ui/card';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Calendar, Globe, Mail, Phone, User } from 'lucide-react';
import { Message } from '@/features/messages/types';

export default function MessageCardHeader({ message }: { message: Message }) {
  return (
    <CardHeader className="py-0 px-3">
      {/* --- SUBJECT BADGE --- */}
      <div>
        <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-900 shadow-sm">
          {message.about}
        </span>
      </div>

      {/* --- METADATA SECTION --- */}
      <CardDescription className="space-y-1 mt-1">
        {/* Name */}
        <div className="flex items-center gap-2.5 text-slate-700">
          <User className="w-3 h-3 text-slate-400 shrink-0" />
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs font-medium text-slate-500">Name:</span>
            <span className="text-sm font-semibold text-slate-800">
              {message.firstName + ' ' + message.lastName}
            </span>
          </div>
        </div>

        {/* Country */}
        {message.country && (
          <div className="flex items-center gap-2.5 text-slate-700">
            <Globe className="w-3 h-3 text-slate-400 shrink-0" />
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs font-medium text-slate-500">
                Country:
              </span>
              <span className="text-xs text-slate-700">{message.country}</span>
            </div>
          </div>
        )}

        {/* Email */}
        {message.email && (
          <div className="flex items-center gap-2.5 text-slate-700 min-w-0 w-full">
            <Mail className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="text-xs font-medium text-slate-500 shrink-0">
              Email:
            </span>
            <HoverCard openDelay={200}>
              <HoverCardTrigger className="text-xs w-[150px] overflow-x-hidden text-slate-700 truncate font-medium transition-all duration-200 decoration-slate-300 underline decoration-dotted underline-offset-4 cursor-help hover:text-blue-600 hover:decoration-blue-400 min-w-0 flex-1">
                {message.email}
              </HoverCardTrigger>
              <HoverCardContent className="shadow-2xl border-slate-200 bg-white p-0 overflow-hidden">
                <p className="p-2 text-sm text-slate-700 break-all font-medium selection:bg-blue-100">
                  {message.email}
                </p>
              </HoverCardContent>
            </HoverCard>
          </div>
        )}

        {/* Phone */}
        {message.phone && (
          <div className="flex items-center gap-2.5 text-slate-700 min-w-0 w-full">
            <Phone className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="text-xs font-medium text-slate-500 shrink-0">
              Phone:
            </span>
            <span className="text-xs text-slate-700">{message.phone}</span>
          </div>
        )}

        {/* Date */}
        <div className="flex items-center gap-2.5 text-slate-700">
          <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
          <div className="flex items-baseline gap-1.5 text-xs">
            <span className="font-medium text-slate-500">Date:</span>
            <span className="text-slate-700">
              {message.createdAt.toLocaleString('en-GB', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>
      </CardDescription>
    </CardHeader>
  );
}
