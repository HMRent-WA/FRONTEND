'use client';

import React, { useCallback } from 'react';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Label } from '../ui/label';

const required = {
  none: 'none',
  true: true,
  false: false,
} as const;

type RequiredEnum = (typeof required)[keyof typeof required];

interface FormElementProps<T extends FieldValues> {
  formControl: Control<T>;
  name: FieldPath<T>;
  required?: RequiredEnum;
  label?: string;
  children: React.ReactNode;
  message?: string;
  description?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FormElement<T extends FieldValues>({
  formControl,
  name,
  required = 'none',
  label,
  children,
  message,
  description,
  onChange,
}: FormElementProps<T>) {
  const isRequired = useCallback(() => {
    if (required === 'none') return null;
    if (required === true)
      return (
        <span className={'ml-0.5 text-[#F31515] text-sm font-medium'}>*</span>
      );
    if (required === false)
      return (
        <span className={'ml-0.5 text-[#AEAEB2] text-sm font-medium'}>
          (선택)
        </span>
      );
  }, [required]);

  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className={'flex items-center'}>
            <Label className={'font-semibold'}>{label}</Label>
            {isRequired()}
          </div>
          <FormControl>
            <div className="flex w-full items-center space-x-2">
              {React.cloneElement(children as React.ReactElement, {
                ...field,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  field.onChange(e); // react-hook-form's onChange
                  onChange && onChange(e);
                },
              })}
            </div>
          </FormControl>
          <FormMessage />
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
}

export default FormElement;
