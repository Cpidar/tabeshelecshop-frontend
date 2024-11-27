'use client'
import React, { useState } from 'react';
import SearchBox from '@/modules/search/components/search-box/SearchBox02';
import SearchResultLoader from '@/components/loaders/search-result-loader';
import SearchProduct from '@/modules/search/components/search-product';

type Props = {
  className?: string;
  searchId?: string;
  variant?: 'border' | 'fill';
};

const Search = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      className = 'md:w-[730px] 2xl:w-[800px]',
      searchId = 'search',
      variant = 'border',
    },
    ref
  ) => {
    
    const [searchText, setSearchText] = useState('');
    const [inputFocus, setInputFocus] = useState<boolean>(false);
    const isLoading = true
    const data = [{
      name: "faslkfjl",
      slug: "fdsafsda"
    }]


    function handleSearch(e: React.SyntheticEvent) {
      e.preventDefault();
      // router.push("/search");
      // inputRef.current?.blur();
    }
    function handleAutoSearch(e: React.FormEvent<HTMLInputElement>) {
      setSearchText(e.currentTarget.value);
    }
    function clear() {
      setSearchText('');
      setInputFocus(false);
    }
    function enableInputFocus() {
      setInputFocus(true);
    }

    return (
      
        <div className="relative z-30 flex-[2] hidden lg:flex justify-center mx-4 transition-all duration-200 ease-in-out">
          <div className="flex flex-col w-full mx-auto">
            <SearchBox
              searchId={searchId}
              name="search"
              value={searchText}
              onSubmit={handleSearch}
              onChange={(e) => setSearchText(e.currentTarget.value)}
              onClear={clear}
              onFocus={() => enableInputFocus()}
              variant={variant}
            />
          </div>
          {/* End of searchbox */}

          {searchText && (
            <div className="w-full absolute top-[76px] ltr:left-0 rtl:right-0 py-2.5 bg-brand-light rounded-md flex flex-col overflow-hidden shadow-dropDown z-30">
                <div className="w-full h-[380px]">
                  {isLoading
                    ? Array.from({ length: 15 }).map((_, idx) => (
                        <div
                          key={`search-result-loader-key-${idx}`}
                          className="py-2.5 ltr:pl-5 rtl:pr-5 ltr:pr-10 rtl:pl-10 scroll-snap-align-start"
                        >
                          <SearchResultLoader
                            key={idx}
                            uniqueKey={`top-search-${idx}`}
                          />
                        </div>
                      ))
                    : data?.map((item, index) => (
                        <div
                          key={`search-result-key-${index}`}
                          className="py-2.5 ltr:pl-5 rtl:pr-5 ltr:pr-10 rtl:pl-10 scroll-snap-align-start transition-colors duration-200 hover:bg-fill-base"
                          onClick={clear}
                        >
                          <SearchProduct item={item} key={index} />
                        </div>
                      ))}
                </div>
            </div>
          )}
          {/* End of search result */}
        </div>
    );
  }
);

Search.displayName = 'Search';
export default Search;
