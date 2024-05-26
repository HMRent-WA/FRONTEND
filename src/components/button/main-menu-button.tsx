import React from 'react';
import { Button, ButtonProps } from '../ui/button';
import { cn } from '@/lib/utils';

const MainMenuButton: React.FC<ButtonProps> = (props) => {
  const { className, children, ...rest } = props;

  const mainMenuButtonVariants = 'w-full h-28 rounded-2xl text-3xl font-medium';

  return (
    <Button className={cn(mainMenuButtonVariants, className)} {...rest}>
      {children}
    </Button>
  );
};

export default MainMenuButton;
