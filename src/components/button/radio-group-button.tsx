'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RadioButtonProps {
  value: string;
  selectedValue: string;
  onClick: (value: string) => void;
  isFirst: boolean;
  isLast: boolean;
  isLeftOfSelected: boolean;
  isRightOfSelected: boolean;
  className?: string;
}

const RadioButton = ({
  value,
  selectedValue,
  onClick,
  isFirst,
  isLast,
  isLeftOfSelected,
  isRightOfSelected,
  className,
}: RadioButtonProps) => {
  const radioVariant =
    'flex-grow text-center border hover:bg-white bg-white text-black rounded-lg';
  const firstRadioVariant = isFirst
    ? 'rounded-r-none'
    : 'rounded-l-none border-l-0';
  const lastRadioVariant = isLast ? 'rounded-l-none' : 'rounded-r-none';

  const selectedVariant =
    selectedValue === value
      ? 'text-primary border border-primary'
      : isLeftOfSelected
        ? 'border-r-0'
        : isRightOfSelected
          ? 'border-l-0'
          : '';

  const combinedVariant = cn(
    radioVariant,
    firstRadioVariant,
    lastRadioVariant,
    selectedVariant
  );

  return (
    <Button
      className={cn('flex-grow', combinedVariant, className)}
      onClick={() => onClick(value)}
    >
      {value}
    </Button>
  );
};

export interface RadioGroupProps {
  options: string[];
  buttonClassName?: string;
  className?: string;
  onClick: (value: string) => void;
  selectedValue: string;
}

const RadioGroupButton = (props: RadioGroupProps) => {
  const { options, buttonClassName, className, onClick, selectedValue } = props;

  return (
    <div className={cn('flex', className)}>
      {options.map((option, idx) => (
        <RadioButton
          key={option}
          value={option}
          selectedValue={selectedValue}
          onClick={onClick}
          isFirst={idx === 0}
          isLast={idx === options.length - 1}
          isLeftOfSelected={options[idx + 1] === selectedValue}
          isRightOfSelected={options[idx - 1] === selectedValue}
          className={buttonClassName}
        />
      ))}
    </div>
  );
};

export { RadioGroupButton };
