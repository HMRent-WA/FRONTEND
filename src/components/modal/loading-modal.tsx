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
    <Dialog open={open ? open : false}>
      <DialogContent className="w-[90%] rounded-2xl">
        <DialogHeader className="py-[1.1875rem] px-4">
          <DialogTitle>업로드 중입니다.</DialogTitle>
          <DialogDescription
            className={
              'text-pretty text-[0.8125rem]/[1.3rem] -tracking-[1%] text-center text-black'
            }
          >
            2분가량 소요될 수 있습니다.
            <br />
            창을 닫지 말고 기다려주세요.
          </DialogDescription>
        </DialogHeader>
        <hr className={'stroke-stroke w-full h-[1px]'} />
        <DialogFooter>
          <LoadingSpinner />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
