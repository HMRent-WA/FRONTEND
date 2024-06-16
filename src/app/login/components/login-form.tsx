'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

type LoginData = { id: string; password: string };

const LoginForm = ({ className }: { className?: string }) => {
  const router = useRouter();

  const form = useForm<LoginData>({
    defaultValues: { id: '', password: '' },
  });

  const onSubmit: SubmitHandler<LoginData> = async (data: LoginData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ USERID: data.id, USERPW: data.password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Login successful:', result);
      if (result) router.push('/');
      // Handle successful login (e.g., store token, redirect, etc.)
    } catch (err) {
      console.error('Login failed:', err);
      // Handle login failure (e.g., show error message)
    }
  };

  return (
    <Card
      className={cn(
        'w-[430px] mx-4 rounded-[16px] border-slate-200 border-[2px] pt-9',
        className
      )}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>아이디</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="사번 또는 아이디를 입력해주세요."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-1 pt-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input
                        type={'password'}
                        placeholder="비밀번호를 입력해주세요."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="items-center justify-center my-3 pt-3">
            <Button
              type="submit"
              size="lg"
              className="font-semibold w-full h-12"
            >
              로그인
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default LoginForm;
