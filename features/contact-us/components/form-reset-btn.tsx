import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { FieldValues, UseFormReset } from 'react-hook-form';

export default function FormResetBtn<T extends FieldValues>({
  reset,
}: {
  reset: UseFormReset<T>;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="rounded-xs hover:border cursor-pointer hover:bg-gray-200"
          variant="outline"
        >
          Reset
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset Form</DialogTitle>
          <DialogDescription>
            Are you sure you want to reset the form? All entered data will be
            lost.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" className="rounded-xs">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              variant="destructive"
              className="rounded-xs"
              onClick={() => reset()}
            >
              Reset
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
