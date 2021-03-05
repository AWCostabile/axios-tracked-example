import React, { ReactNode } from 'react';
import { Button, IButtonProps } from './button';

interface IButtonGroupProps extends Omit<IButtonProps, 'onClick'> {
  buttons: Array<IButtonProps & { label: ReactNode }>;
}

export const ButtonGroup: React.FC<IButtonGroupProps> = ({
  buttons,
  children,
  ...commonProps
}) => (
  <div>
    {buttons.map(({ label, ...button }, index) => (
      <Button key={index} {...commonProps} {...button}>
        {label}
      </Button>
    ))}
  </div>
);
