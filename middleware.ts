// import { NextRequest } from 'next/server';
// import { NextResponse } from 'next/server';

// const ONLY_PUBLIC_PATHS = ['/login'];

// export const BOTH_PUBLIC_AND_PRIVATE_PATHS = ['/contact'];

// export async function middleware(request: NextRequest) {
//   if (request.nextUrl.pathname.startsWith('/_next')) {
//     return NextResponse.next();
//   }
//   if (request.url) {
//     if (request.nextUrl.pathname.startsWith('/api')) {
//       return NextResponse.next();
//     }
//   }
//   if (request.nextUrl.pathname.startsWith('/favicon.ico')) {
//     return NextResponse.next();
//   }

//   const sessionCookie = request.cookies.get('express:sess');
//   const isLogined = !!sessionCookie;

//   if (ONLY_PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
//     if (isLogined) {
//       return NextResponse.redirect(new URL('/main', request.url));
//     }
//     return NextResponse.next();
//   } else if (BOTH_PUBLIC_AND_PRIVATE_PATHS.includes(request.nextUrl.pathname)) {
//     return NextResponse.next();
//   } else {
//     if (!isLogined) {
//       return NextResponse.redirect(new URL('/signin/step1', request.url));
//     }

//     const response = NextResponse.next();
//     response.cookies.set('express:sess', sessionCookie, { path: '/' });
//     return response;
//   }
// }

// export const config = {
//   matcher: [{ source: '/:path*' }],
// };
