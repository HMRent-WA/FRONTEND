import React from 'react';
import Image from 'next/image'; // Import the 'Image' component from the appropriate package
import Link from 'next/link';

const Layout = ({ children }: { children: React.ReactNode }) => {
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
