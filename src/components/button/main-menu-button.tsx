import React from 'react';
import { Button, ButtonProps } from '../ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type MainMenuButtonProps = ButtonProps & {
  href: string;
};

const MainMenuButton: React.FC<MainMenuButtonProps> = (props) => {
  const { className, href, children, ...rest } = props;

  const mainMenuButtonVariants = 'w-full h-24 rounded-2xl text-xl font-medium';

  return (
    <Link href={href} className="w-full">
      <Button className={cn(mainMenuButtonVariants, className)} {...rest}>
        {children}
      </Button>
    </Link>
  );
};

export default MainMenuButton;
