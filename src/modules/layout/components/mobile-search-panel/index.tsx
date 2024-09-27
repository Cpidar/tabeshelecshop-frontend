"use client";

import React from "react";
import ButtonClose from "@/shared/ButtonClose/ButtonClose";
import SearchModal from "@/modules/search/templates/search-modal";

export interface MobileSearchPanelProps {
  onClickClose?: () => void;
}

const MobileSearchPanel: React.FC<MobileSearchPanelProps> = ({
  onClickClose,
}) => {

  return (
    <div className="overflow-y-auto w-full h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800">

      <div className="py-6 px-5">

        <span className="absolute left-2 top-2 p-1">
          <ButtonClose onClick={onClickClose} />
        </span>

        <SearchModal onClickClose={onClickClose} />

      </div>
      
    </div>
  );
};

export default MobileSearchPanel;
