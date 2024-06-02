'use client';

import React, { useCallback } from 'react';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
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
  //   FIXME: required label, placeholder, message,
}

function FormElement<T extends FieldValues>({
  formControl,
  name,
  required = 'none',
  label,
  children,
  message,
  description,
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
            <div className="flex w-full  items-center space-x-2">
              {React.cloneElement(children as React.ReactElement, {
                ...field,
              })}
            </div>
          </FormControl>
          {message && <FormMessage>{message}</FormMessage>}
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
}

export default FormElement;
