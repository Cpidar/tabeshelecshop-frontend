import Button, { ButtonProps } from "@/components/Button/Button";
import React from "react";

export interface ButtonSecondaryProps extends ButtonProps {}

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({
  className = " border border-border ",
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonSecondary bg-background text-foreground hover:bg-muted ${className}`}
      {...args}
    />
  );
};

export default ButtonSecondary;
