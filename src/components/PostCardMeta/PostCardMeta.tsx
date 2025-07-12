import React, { FC } from "react";
import Avatar from "@/components/Avatar/Avatar";
import { _getPersonNameRd } from "@/data/fakeData";
import Link from "next/link";

export interface PostCardMetaProps {
  className?: string;
  hiddenAvatar?: boolean;
}

const PostCardMeta: FC<PostCardMetaProps> = ({
  className = "leading-none",
  hiddenAvatar = false,
}) => {
  return (
    <div
      className={`nc-PostCardMeta inline-flex items-center fledx-wrap text-foreground text-sm ${className}`}
      data-nc-id="PostCardMeta"
    >
      <Link
        href={"/blog"}
        className="shrink-0 relative flex items-center space-x-2"
      >
        {!hiddenAvatar && (
          <Avatar radius="rounded-full" sizeClass={"h-7 w-7 text-sm"} />
        )}
        <span className="block text-muted-foreground hover:text-foreground font-medium">
          {_getPersonNameRd()}
        </span>
      </Link>
      <>
        <span className="text-muted-foreground mx-[6px] font-medium">
          ·
        </span>
        <span className="text-muted-foreground font-normal line-clamp-1">
          May 20, 2021
        </span>
      </>
    </div>
  );
};

export default PostCardMeta;
