'use client';
import { Button } from '@/components/ui/button';
import { showSuccessToast } from '@/lib/toast';
import { useToast } from '@/lib/use-toast';
import React, { useEffect } from 'react';

const TestPage = () => {
  const { toast } = useToast();

  useEffect(() => {
    showSuccessToast('성공이당');
  }, []);

  return (
    <div>
      <Button
        onClick={() => {
          toast({
            variant: 'success',
            description: 'Friday, February 10, 2023 at 5:57 PM',
          });
        }}
      >
        success
      </Button>
      <Button
        onClick={() => {
          toast({
            variant: 'error',
            description: 'Friday, February 10, 2023 at 5:57 PM',
          });
        }}
      >
        failure
      </Button>
    </div>
  );
};

export default TestPage;
