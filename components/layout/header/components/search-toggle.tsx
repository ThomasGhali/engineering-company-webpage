'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { IconButton, TextField, Box } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

const SearchToggle = () => {
  const [searchHidden, setSearchHidden] = useState<boolean>(true);
  const searchRef = useRef<HTMLInputElement>(null);

  // Focus search bar on appear
  useEffect(() => {
    if (searchHidden) return;
    searchRef.current?.focus();
  }, [searchHidden]);

  return (
    <>
      <div
        className={`flex items-center gap-4 ${!searchHidden ? 'hidden' : 'block'}`}
      >
        <Search
          color="white"
          className="w-5 h-5 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => setSearchHidden(!searchHidden)}
        />
      </div>

      <div className={`${searchHidden ? 'hidden' : 'block'}`}>
        <Box className="overflow-hidden w-30 sm:w-64 md:w-80 max-w-[350px]">
          <TextField.Root
            placeholder="Search projects..."
            size="2"
            ref={searchRef}
            variant="surface"
            className="rounded-full bg-white border border-charcoal-200 shadow-sm ring-primary-100 focus-within:ring-1"
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" color="gray" />
            </TextField.Slot>

            <TextField.Slot>
              <IconButton
                size="1"
                variant="ghost"
                onClick={() => setSearchHidden(true)}
                className="cursor-pointer hover:bg-gray-100 rounded-full mr-1"
              >
                <X size={14} strokeWidth={2.5} color="black" />
              </IconButton>
            </TextField.Slot>
          </TextField.Root>
        </Box>
      </div>
    </>
  );
};

export default SearchToggle;
