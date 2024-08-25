'use client';

import React from 'react';
import { Button, ButtonProps } from '../ui/button';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

type MainMenuButtonProps = ButtonProps & {
  href: string;
};

const MainMenuButton: React.FC<MainMenuButtonProps> = (props) => {
  const { className, href, children, ...rest } = props;
  const router = useRouter();

  const mainMenuButtonVariants = 'w-full h-24 rounded-2xl text-xl font-medium';

  const handleClick = () => {
    router.push(href);
  };

  return (
    <Button
      className={cn(mainMenuButtonVariants, className)}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default MainMenuButton;
