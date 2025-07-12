import { _getTagNameRd } from "@/data/fakeData";
import Link from "next/link";
import React, { FC } from "react";

export interface TagProps {
  className?: string;
  hideCount?: boolean;
}

const Tag: FC<TagProps> = ({ className = "", hideCount = false }) => {
  // DEMO DATA
  return (
    <Link
      className={`nc-Tag inline-block bg-background text-sm text-muted-foreground py-2 px-3 rounded-lg border border-border md:py-2.5 md:px-4 hover:border-muted-foreground ${className}`}
      data-nc-id="Tag"
      href={"/blog"}
    >
      {`${_getTagNameRd()}`}
      {!hideCount && <span className="text-xs font-normal"> (22)</span>}
    </Link>
  );
};

export default Tag;
