import { Button } from '@radix-ui/themes';

import { signOut } from '@/auth';

export default function LogoutButton() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
     
    >
      <Button type="submit" variant="soft" className="cursor-pointer!">
        Sign Out
      </Button>
    </form>
  );
}
