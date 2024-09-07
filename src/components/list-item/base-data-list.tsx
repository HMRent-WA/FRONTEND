import { cn } from '@/lib/utils';
import React from 'react';
import { Label } from '../ui/label';

export interface Items {
  name: string;
  value: string;
}

interface BaseDataListBoxProps {
  children?: React.ReactNode;
  className?: string;
}

interface BaseDataItemProps {
  name: string;
  value: string;
}

interface BaseDataListProps {
  items: Items[];
  className?: string;
}

export const BaseDataListBox = (props: BaseDataListBoxProps) => {
  const { children, className } = props;
  return <ul className={cn('flex flex-col gap-4', className)}>{children}</ul>;
};

export const BaseDataItem = (props: BaseDataItemProps) => {
  const { name, value } = props;

  return (
    <li className="flex items-center gap-4">
      <Label className="font-semibold">{name}</Label>
      <p>{value}</p>
    </li>
  );
};

export const BaseDataList = (props: BaseDataListProps) => {
  const { items, className } = props;
  return (
    <BaseDataListBox className={className}>
      {items.map((item) => {
        return (
          <BaseDataItem key={item.name} name={item.name} value={item.value} />
        );
      })}
    </BaseDataListBox>
  );
};
