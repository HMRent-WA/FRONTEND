import React from 'react';
import Image from 'next/image';
import LoginForm from './components/login-form';

const Login = () => {
  return (
    <div className="h-screen">
      <header className="flex justify-center">
        <Image src="/assets/png/logo.png" alt="logo" width={200} height={200} />
      </header>
      <section className="w-screen flex justify-center items-center h-2/3">
        <LoginForm className="" />
      </section>
    </div>
  );
};

export default Login;
