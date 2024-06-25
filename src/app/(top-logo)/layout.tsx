'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { showErrorToast } from '@/lib/toast';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  // const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('auth -> ', data, data.message);
        if (data.message === 'FAIL') {
          // showErrorToast('로그인 후 이용해주세요.');
          // router.push('/login');
        }
      })
      .catch((err) => {
        // TODO: 아래 주석 해제해야 비로그인 접근 제어 가능
        // showErrorToast('로그인 후 이용해주세요.');
        // router.push('/login');
        console.error('Auth failed:', err);
      });
  }, [router]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

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
