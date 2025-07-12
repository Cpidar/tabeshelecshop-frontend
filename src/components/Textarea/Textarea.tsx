import React, { TextareaHTMLAttributes } from "react";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

// eslint-disable-next-line react/display-name
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", children, rows = 4, ...args }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`block w-full text-sm rounded-2xl border-border focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-background ${className}`}
        rows={rows}
        {...args}
      >
        {children}
      </textarea>
    );
  }
);

export default Textarea;
