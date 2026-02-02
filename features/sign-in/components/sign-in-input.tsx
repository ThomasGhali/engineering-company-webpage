import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { FormInputProps } from '@/features/sign-in/types';

export default function SignInInput({
  label,
  placeholder,
  name,
  type = 'text',
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
  return (
    <Field>
      <FieldLabel
        htmlFor={name}
        className="text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-1.5"
      >
        {label}
      </FieldLabel>

      <div className="relative">
        <Input
          id={name}
          name={name}
          required
          type={inputType}
          aria-required="true"
          placeholder={placeholder}
          className="bg-zinc-800/50 border-white/5 focus:bg-zinc-800 transition-all text-white placeholder:text-zinc-500 h-11 pr-10"
          minLength={1}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors cursor-pointer"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        )}
      </div>
    </Field>
  );
}
