import { useActionState, useEffect, useRef } from 'react';

import { SendHorizonal, X } from 'lucide-react';

import { Spinner } from '@radix-ui/themes';

import { Field } from '@/components/ui/field';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { InputGroup, InputGroupTextarea } from '@/components/ui/input-group';
import { CardContent, CardHeader } from '@/components/ui/card';

import { Message } from '@/features/messages/types';

import { replyMessage } from './actions';
import { toast } from '@/components/ui/sonner';

export default function ReplyForm({
  message,
  setIsReplying,
  setIsReplied,
}: {
  message: Message;
  setIsReplying: React.Dispatch<React.SetStateAction<boolean>>;
  setIsReplied: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const replyFormRef = useRef<HTMLFormElement>(null);
  const [replyState, replyAction, isReplyPending] = useActionState(
    replyMessage,
    { error: undefined, success: undefined },
  );

  // Handle reply state and toasts
  useEffect(() => {
    if (isReplyPending) {
      toast.loading('Replying...', { id: 'reply-status' });
    } else if (replyState.error) {
      toast.error('Error', {
        description: replyState.error,
        id: 'reply-status',
      });
    } else if (replyState.success) {
      toast.success('Reply sent successfully!', {
        id: 'reply-status',
      });
      setIsReplying(false);
      setIsReplied(true);
    }
  }, [
    isReplyPending,
    replyState.error,
    replyState.success,
    setIsReplying,
    setIsReplied,
  ]);
  return (
    <>
      {/* --- REPLY FORM --- */}
      <form
        ref={replyFormRef}
        action={replyAction}
        className="grid grid-rows-3-[1fr_2fr] h-full"
      >
        {/* Pass formData: id, sendToEmail, sendToAbout */}
        <input type="hidden" name="id" value={message.id} />
        <input
          type="hidden"
          name="sendToEmail"
          value={message.email || undefined}
        />
        <input type="hidden" name="sendToAbout" value={message.about} />

        {/* Header */}
        <CardHeader className="text-sm font-medium">
          Replying to {`${message.firstName} ${message.lastName}`}
        </CardHeader>

        {/* Message to send */}
        <CardContent className="flex flex-col justify-between px-4">
          <Field>
            <InputGroup>
              <InputGroupTextarea
                name="message"
                placeholder="Enter your message .."
                className="min-h-[80px] max-h-[260px] w-[235px] overflow-y-auto resize-none"
              />
            </InputGroup>
          </Field>

          {/* --- REPLY FORM ACTIONS --- */}
          <div className="w-full flex justify-between">
            <ConfirmDialog
              title="Send Message"
              description="Are you sure you want to send this message?"
              confirmLabel="Send"
              onConfirm={() => replyFormRef.current?.requestSubmit()}
            >
              {/* Send button */}
              <button className="button-action text-foreground">
                {isReplyPending ? (
                  <>
                    <Spinner />
                    Sending
                  </>
                ) : (
                  <>
                    Send
                    <SendHorizonal className="w-4 h-4" />
                  </>
                )}
              </button>
            </ConfirmDialog>

            {/* Cancel button */}
            <ConfirmDialog
              title="Cancel Reply"
              description="Are you sure you want to cancel? Your message will be lost."
              confirmLabel="Discard"
              cancelLabel="Continue Editing"
              variant="destructive"
              onConfirm={() => setIsReplying(false)}
            >
              <button className="button-action text-foreground hover:text-destructive">
                Cancel
                <X className="w-4 h-4" />
              </button>
            </ConfirmDialog>
          </div>
        </CardContent>
      </form>
    </>
  );
}
