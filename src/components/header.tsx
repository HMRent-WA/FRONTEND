'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

export const Header = () => {
  const router = useRouter();

  return (
    <header className="fixed w-full px-4 h-[3.75rem] flex justify-between items-center bg-white z-30">
      <button onClick={() => router.back()} className={'size-6'}>
        <ChevronLeft className="stroke-[#444444]" />
      </button>
      <Link href="/">
        <Image src="/assets/png/logo.png" alt="logo" width={160} height={160} />
      </Link>
      <div className={'size-8'} />
    </header>
  );
};
