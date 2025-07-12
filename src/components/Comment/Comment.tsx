import { _getPersonNameRd } from "@/data/fakeData";
import React from "react";
import { FC } from "react";
import Avatar from "@/components/Avatar/Avatar";

export interface CommentProps {
  isSmall?: boolean;
}

const Comment: FC<CommentProps> = ({ isSmall }) => {
  return (
    <div className="nc-CommentCard flex ">
      <div className="pt-1">
        <Avatar sizeClass={`w-6 h-6 ${!isSmall ? "sm:h-8 sm:w-8 " : ""}`} />
      </div>
      <div className="grow flex flex-col p-4 ml-2 text-sm border border-border rounded-xl sm:ml-3 sm:text-base">
        <div className="relative flex items-center pr-6">
          <a
            className="shrink-0 font-semibold text-foreground"
            href="/ncmaz/author/the-demo-author-slug"
          >
            {_getPersonNameRd()}
          </a>
          <span className="mx-2">·</span>
          <span className="text-muted-foreground text-xs line-clamp-1 sm:text-sm">
            May 20, 2021
          </span>
        </div>
        <span className="block text-foreground mt-2 mb-3 sm:mt-3 sm:mb-4">
          In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at,
          feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend
          quam a odio. In hac habitasse platea dictumst.
        </span>
        <div>
          <button
            className="inline-flex items-center min-w-[68px] rounded-full text-foreground bg-muted px-3 h-8 hover:bg-muted hover:text-foreground focus:outline-none "
            title="Reply"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-[18px] w-[18px] mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
              ></path>
            </svg>
            <span className="text-xs leading-none text-foreground">
              Reply
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
