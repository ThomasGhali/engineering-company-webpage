'use client';

import { useState, useRef, useActionState } from 'react';

import { Card, CardFooter } from '@/components/ui/card';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';

import { Trash2, Reply as ReplyIcon } from 'lucide-react';

import MessageCardHeader from './message-card-header';
import MessageCardContent from './message-card-content';

import { Message } from './types';

import { deleteMessage } from './actions';
import { Spinner } from '@/components/ui/spinner';
import ReplyForm from '@/features/messages/message-card-reply-form';

export default function MessageCard({ message }: { message: Message }) {
  const [isReplying, setIsReplying] = useState(false);
  const [isReplied, setIsReplied] = useState(message.replied);

  const deleteFormRef = useRef<HTMLFormElement>(null);

  const [deleteState, deleteAction, isDeletePending] = useActionState(
    deleteMessage,
    { error: undefined, success: undefined },
  );

  return (
    <Card className="w-[270px] gap-3 border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-linear-to-r from-white to-slate-50/50 overflow-hidden">
      {isReplying ? (
        <ReplyForm
          message={message}
          setIsReplying={setIsReplying}
          setIsReplied={setIsReplied}
        />
      ) : (
        <>
          <MessageCardHeader message={message} />

          <MessageCardContent message={message} />

          <CardFooter className="flex justify-around w-full px-0">
            <button
              onClick={() => setIsReplying(true)}
              className={
                'button-action' +
                (isReplied
                  ? ' bg-green-600 hover:bg-green-700 px-3'
                  : ' bg-blue-600 hover:bg-blue-700')
              }
            >
              <ReplyIcon className="w-4 h-4" />
              {isReplied ? 'Reply again' : 'Reply'}
            </button>

            <form ref={deleteFormRef} action={deleteAction}>
              <input type="hidden" name="id" value={message.id} />
              <ConfirmDialog
                title="Delete Message"
                description="Are you sure you want to delete this message?"
                confirmLabel="Delete"
                variant="destructive"
                onConfirm={() => deleteFormRef.current?.requestSubmit()}
              >
                <button className="button-action text-foreground hover:text-destructive">
                  {isDeletePending ? (
                    <>
                      <Spinner />
                      Deleting
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </>
                  )}
                </button>
              </ConfirmDialog>
            </form>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
