import React, { FC } from "react";
import MainNav5 from "./MainNav5";
import HighlightedBar from "./highlighted-bar";
import Link from "next/link";
export interface HeaderLoggedProps {}

const HeaderLogged: FC<HeaderLoggedProps> = () => {
  return (
    <div className="nc-HeaderLogged top-0 w-full z-40 ">
      <HighlightedBar
        variant="highlightedTwo"
        className="text-[#460135]"
      >
        <div className="text-sm font-medium py-0.5 ltr:pr-6 rtl:pl-6">
          <span>
            {
              "35% Exclusive discount plus free next day delivery, excludes sale"
            }
            <Link
              href="#"
              className="inline-flex text-xs uppercase font-bold ltr:pl-1.5 rtl:pr-1.5 items-center relative transition-all top-[1px] hover:opacity-80"
            >
              <span className="border-b border-[#460135] inline-block pb-0.5">
                Learn More
              </span>
            </Link>
          </span>
        </div>
      </HighlightedBar>
      <MainNav5 />
    </div>
  );
};

export default HeaderLogged;
