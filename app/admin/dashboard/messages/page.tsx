import MessagesPage from '@/features/messages/components/messages';
import { Suspense } from 'react';
import MessagesSkeleton from '../../../../features/messages/components/messages-skeleton';

export default function Messages() {
  return (
    <>
      <Suspense fallback={<MessagesSkeleton />}>
        <MessagesPage />
      </Suspense>
    </>
  );
}
