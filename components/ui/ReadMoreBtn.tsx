import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ActionBtn({
  filled,
  empty,
  transparent,
  btnStyles,
  content = 'Read more',
  white,
}: {
  filled?: boolean;
  empty?: boolean;
  transparent?: boolean;
  white?: boolean;
  btnStyles?: string;
  content?: string;
}) {
  const filledStyle = filled
    ? 'bg-primary-100 text-white! border-none border-text-main hover:border-primary-hover font-semibold  '
    : 'text-text-main group hover:text-white border-text-main hover:border-primary-hover font-semibold  ';
  const borderStyle = !filled ? 'border-l border-text-main' : '';
  const emptyStyle = empty
    ? 'bg-transparent text-white text-[1rem] font-normal! '
    : '';

  return (
    <button
      className={cn(
        'text-sm cursor-pointer  transition-all duration-200 ease-in-out flex mt-5 mb-2 rounded-[2px] font-semibold',
        'hover:bg-primary-hover border-text-main hover:border-primary-hover',
        btnStyles,
        {
          'bg-primary-100 text-white! border-none': filled,
          'text-text-main group hover:text-white border': transparent,
          'text-white group hover:text-white border border-white': white,
          'text-white text-[1rem] font-normal hover:bg-transparent hover:border-none':
            empty,
        },
      )}
    >
      <span className="flex items-center px-5">{content}</span>

      <div
        className={cn('group-hover:border-primary-hover pl-2 p-1.5', {
          'border-none': filled,
          'border-l border-text-main': transparent,
          'border-l border-white group-hover:border-none': white,
        })}
      >
        <ChevronRight strokeWidth={2} />
      </div>
    </button>
  );
}
