'use client';
import React from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { Form } from '@/components/ui/form';

interface FormWrapperProps<T extends FieldValues> {
  children: React.ReactNode;
  onSubmit: (data: any) => void;
  className?: string;
  form: UseFormReturn<T>;
}

export default function FormWrapper<T extends FieldValues>({
  form,
  children,
  onSubmit,
  className,
}: FormWrapperProps<T>) {
  return (
    <Form {...form}>
      <form className={className} onSubmit={form.handleSubmit(onSubmit)}>
        {children}
      </form>
    </Form>
  );
}
