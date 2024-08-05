// SuccessToast.ts
import { toast } from '@/lib/use-toast';

export const showSuccessToast = (description: string, delay?: number) => {
  const newToast = toast({
    variant: 'success',
    description,
  });
  setTimeout(
    () => {
      newToast.dismiss();
    },
    delay ? delay : 4000
  );
};

export const showErrorToast = (description: string, delay?: number): void => {
  const newToast = toast({
    variant: 'error',
    description,
  });
  setTimeout(
    () => {
      newToast.dismiss();
    },
    delay ? delay : 4000
  );
};
