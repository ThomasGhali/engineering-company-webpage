'use client';

import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { IconButton, TextField, Box } from '@radix-ui/themes';
import { MagnifyingGlassIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';

/**
 * Client-side component:
 * Handles the search toggle functionality.
 */
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
          className="w-5 h-5 cursor-pointer"
          onClick={() => setSearchHidden(!searchHidden)}
        />
      </div>

      <div className={`${searchHidden ? 'hidden' : 'block'}`}>
        <Box className="max-w-[30vw] bg-charcoal-900">
          <TextField.Root placeholder="Search" size="2" ref={searchRef}>
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
            <TextField.Slot>
              <IconButton size="1" variant="ghost">
                <DotsHorizontalIcon height="14" width="14" />
              </IconButton>
            </TextField.Slot>
          </TextField.Root>
        </Box>
      </div>
    </>
  );
};

export default SearchToggle;
