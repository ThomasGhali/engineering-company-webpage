'use client';

import { FieldGroup } from '@/components/ui/field';
import { Button } from '@/components/ui/button';

import Link from 'next/link';

import { ArrowLeft, Lock } from 'lucide-react';
import SignInInput from '@/features/sign-in/components/sign-in-input';
import SignInHeader from '@/features/sign-in/components/sign-in-header';

import { adminSignIn } from '@/features/sign-in/actions';
import { useActionState } from 'react';

export default function SignInForm() {
  const [state, formAction, isPending] = useActionState(adminSignIn, null);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-zinc-950 px-4 overflow-hidden">
      {/* --- BACKGROUND DECORATIONS --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* top-right */}
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-primary-100/5 blur-[120px] rounded-full" />
        {/* bottom-left */}
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-primary-100/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative w-full max-w-[400px]">
        {/* --- NAVIGATION --- */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 text-sm group"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Back to website
        </Link>

        {/* --- MAIN LOGIN CARD --- */}
        <div className="w-full border border-white/10 rounded-2xl px-8 py-10 text-white bg-zinc-900/50 backdrop-blur-xl shadow-2xl flex flex-col items-center">
          {/* Logo Section */}
          <SignInHeader />

          {/* Login Form */}
          <form action={formAction} className="w-full space-y-6">
            {state?.error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm px-4 py-2 rounded-lg text-center font-medium">
                {state.error}
              </div>
            )}
            <FieldGroup className="gap-5">
              {/* Username Field */}
              <SignInInput
                label="Username"
                name="username"
                placeholder="Enter your username"
              />

              {/* Password Field */}
              <SignInInput
                label="Password"
                name="password"
                placeholder="Enter your password"
                type="password"
              />
            </FieldGroup>

            {/* Submit Action */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-11 bg-primary-100 hover:bg-primary-hover text-white font-semibold rounded-lg transition-all active:scale-[0.98] hover:shadow-[0_0_20px_rgba(239,76,0,0.2)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? 'Signing In...' : 'Sign In'}
            </Button>

            {/* Footer Form Info */}
            <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500 uppercase tracking-widest pt-4">
              <Lock className="size-3" />
              Secure Encrypted Session
            </div>
          </form>
        </div>

        {/* --- FOOTER COPYRIGHT --- */}
        <p className="text-center mt-8 text-zinc-600 text-xs">
          &copy; {new Date().getFullYear()} T. Engineering. All rights reserved.
        </p>
      </div>
    </div>
  );
}
