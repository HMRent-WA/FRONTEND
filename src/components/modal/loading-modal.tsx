'use client';

import LoadingSpinner from '@/components/loading-spinner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface LoadingModalProps {
  open: boolean;
}

export const LoadingModal = (props: LoadingModalProps) => {
  const { open } = props;

  return (
    <Dialog open={open ? open : false} defaultOpen>
      <DialogContent className="w-[70%] rounded-2xl max-w-[300px]">
        <DialogHeader className="py-[1.1875rem] px-4 flex flex-col gap-4">
          <DialogTitle className="text-center">업로드 중입니다.</DialogTitle>
          <DialogDescription
            className={
              'text-pretty text-[0.8125rem]/[1.3rem] -tracking-[1%] text-center text-black'
            }
          >
            <span className={'mb-1'}>2분가량 소요될 수 있습니다.</span>
            <br />
            <span>창을 닫지 말고 기다려주세요.</span>
          </DialogDescription>
          <LoadingSpinner />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
