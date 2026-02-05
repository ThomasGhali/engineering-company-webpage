'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useRouter, useSearchParams } from 'next/navigation';

const renderPaginationButtons = (
  currentPage: number,
  pagesNumber: number,
  goToPage: (page: number) => void,
) => {
  const buttonsNumber = pagesNumber <= 3 ? pagesNumber : 3;

  return (
    <>
      {/* Return 3 buttons */}
      {Array.from({ length: buttonsNumber }).map((_, index) => {
        // Show pages around currentPage; clamp near the last page
        const buttonFirstNumber =
          currentPage >= pagesNumber
            ? Math.max(1, pagesNumber - 2 + index)
            : currentPage + index;

        return (
          <PaginationItem key={index}>
            <PaginationLink
              onClick={() => goToPage(buttonFirstNumber)}
              className="h-10 w-10 rounded-lg text-sm font-semibold transition-all hover:bg-foreground/30"
            >
              {String(buttonFirstNumber)}
            </PaginationLink>
          </PaginationItem>
        );
      })}
    </>
  );
};

export default function MessagesPagination({
  messagesLength,
}: {
  messagesLength: number;
}) {
  const params = useSearchParams();
  const router = useRouter();

  const currentPage = Number(params.get('page') || 1);

  const pagesNumber = Math.ceil(messagesLength / 10);

  const goToPage = (page: number) => {
    if (page < 1 || page > pagesNumber) return;

    const paramsObj = new URLSearchParams(params);
    paramsObj.set('page', String(page));
    router.push(`?${paramsObj.toString()}`);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 border-t bg-muted/2 px-4 py-6 sm:flex-row sm:gap-4 sm:px-8">
      <Pagination className="mx-0 w-auto">
        <PaginationContent className="gap-2 sm:gap-3">

          <PaginationItem>
            <PaginationPrevious
              onClick={() => goToPage(currentPage - 1)}
              className={`h-10 rounded-lg border border-muted-foreground/15 bg-background px-4 text-sm font-semibold transition-all hover:bg-muted hover:text-foreground active:scale-[0.98]
              ${currentPage <= 1 ? 'pointer-events-none opacity-50 cursor-not-allowed' : ''}`}
            />
          </PaginationItem>

          {/* --- FIRST PAGE & ELLIPSIS --- */}
          {currentPage <= 2 ? null : (
            <>
              <PaginationItem>
                <PaginationLink
                  onClick={() => goToPage(1)}
                  className="h-10 w-10 rounded-lg text-sm font-semibold transition-all hover:bg-muted"
                >
                  {'1'}
                </PaginationLink>
              </PaginationItem>{' '}
              
              <PaginationItem className="flex items-center justify-center px-1 text-muted-foreground/40">
                <PaginationEllipsis className="h-4 w-4" />
              </PaginationItem>
            </>
          )}

          <div className="flex">
            {renderPaginationButtons(currentPage, pagesNumber, goToPage)}

            {/* --- LAST PAGE & ELLIPSIS --- */}
            {pagesNumber <= 3 || currentPage + 2 >= pagesNumber ? null : (
              <>
                <PaginationItem className="flex items-center justify-center px-1 text-muted-foreground/40">
                  <PaginationEllipsis className="h-4 w-4" />
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink
                    onClick={() => goToPage(pagesNumber)}
                    className="h-10 w-10 rounded-lg text-sm font-semibold transition-all hover:bg-muted"
                  >
                    {pagesNumber}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}
          </div>

          <PaginationItem>
            <PaginationNext
              onClick={() => goToPage(currentPage + 1)}
              className={`h-10 rounded-lg border border-muted-foreground/15 bg-background px-4 text-sm font-semibold transition-all hover:bg-muted hover:text-foreground active:scale-[0.98]
              ${currentPage >= pagesNumber ? 'pointer-events-none opacity-50 cursor-not-allowed' : ''}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
