import MessageCard from './message-card';

import MessagesPagination from './messages-pagination';
import { getMessages } from '@/features/messages/queries';

import { Message } from '@/features/messages/types';

export default async function MessagesPage({
  searchParams,
}: {
  searchParams?: Promise<{
    page: string;
  }>;
}) {
  const params = await searchParams;
  const page = Number(params?.page || 1);
  const { messages, messagesCount } = await getMessages({ page });

  return (
    // --- MESSAGE CARDS ---
    <div className="flex flex-1 flex-col gap-4 p-4 w-full">
      <div className="flex flex-wrap gap-4 justify-around">
        {messages.map((message: Message) => (
          <MessageCard key={message.id} message={message} />
        ))}
      </div>

      {/* --- PAGINATION --- */}
      <MessagesPagination messagesLength={messagesCount} />
    </div>
  );
}
