import React, { FC } from "react";

export interface RadioProps {
  className?: string;
  name: string;
  id: string;
  onChange?: (value: string) => void;
  defaultChecked?: boolean;
  sizeClassName?: string;
  label?: string;
}

const Radio: FC<RadioProps> = ({
  className = "",
  name,
  id,
  onChange,
  label,
  sizeClassName = "w-6 h-6",
  defaultChecked,
}) => {
  return (
    <div className={`flex items-center text-sm sm:text-base ${className}`}>
      <input
        id={id}
        name={name}
        type="radio"
        className={`focus:ring-action-primary text-primary-500 rounded-full border-border hover:border-border bg-transparent focus:ring-primary-500 ${sizeClassName}`}
        onChange={(e) => onChange && onChange(e.target.value)}
        defaultChecked={defaultChecked}
        value={id}
      />
      {label && (
        <label
          htmlFor={id}
          className="pl-2.5 sm:pl-3 block text-foreground select-none"
          dangerouslySetInnerHTML={{ __html: label }}
        ></label>
      )}
    </div>
  );
};

export default Radio;
