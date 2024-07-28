'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { showErrorToast } from '@/lib/toast';
import LoadingPage from '@/components/loading-page';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : ' '}`,
            },
            // credentials: 'include',
          }
        );
        const data = await response.json();
        console.log('auth -> ', data, data.message);
        if (data.message === 'FAIL') {
          showErrorToast('로그인 후 이용해주세요.');
          router.push('/login');
        }
      } catch (error) {
        showErrorToast('로그인 후 이용해주세요.');
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuth();
  }, [router]);

  if (isLoading) {
    return <LoadingPage />;
  }

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
