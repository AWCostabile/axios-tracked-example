import React from 'react';

export interface IButtonProps {
  className?: string;
  disabled?: boolean;
  onClick?: (() => void) | false;
}

export const Button: React.FC<IButtonProps> = ({
  children,
  className,
  disabled,
  onClick,
}) => (
  <button
    className={className}
    disabled={disabled}
    onClick={onClick || undefined}
  >
    {children}
  </button>
);
