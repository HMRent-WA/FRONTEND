'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'FAIL') {
          router.push('/login');
        }
      })
      .catch(() => {
        router.push('/login');
      });
  }, []);

  return (
    <div className="w-full h-full">
      <header className="flex justify-center">
        <Link href="/">
          <Image
            src="/assets/png/logo.png"
            alt="logo"
            width={200}
            height={200}
          />
        </Link>
      </header>
      <section className="">{children}</section>
    </div>
  );
};

export default Layout;
