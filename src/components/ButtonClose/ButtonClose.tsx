import React from "react";
import { XIcon } from "lucide-react";
import twFocusClass from "@/utils/twFocusClass";

export interface ButtonCloseProps {
  className?: string;
  IconclassName?: string;
  onClick?: () => void;
}

const ButtonClose: React.FC<ButtonCloseProps> = ({
  className = "",
  IconclassName = "w-5 h-5",
  onClick = () => {},
}) => {
  return (
    <button
      className={
        `w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground hover:bg-muted ${className} ` +
        twFocusClass()
      }
      onClick={onClick}
    >
      <span className="sr-only">Close</span>
      <XIcon className={IconclassName} />
    </button>
  );
};

export default ButtonClose;
