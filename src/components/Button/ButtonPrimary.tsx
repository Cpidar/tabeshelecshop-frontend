import Button, { ButtonProps } from "@/components/Button/Button";
import React from "react";

export interface ButtonPrimaryProps extends ButtonProps {}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = "",
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonPrimary disabled:bg-opacity-90 bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl ${className}`}
      {...args}
    />
  );
};

export default ButtonPrimary;
