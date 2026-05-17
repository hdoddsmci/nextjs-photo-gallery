// import { NextResponse, NextRequest } from 'next/server';

// export function middleware(req: NextRequest) {
//   if (req.nextUrl.pathname === '/dashboard') {
//     return NextResponse.redirect(new URL('/', req.url));
//   }
// }

import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log("Someone visited:", request.nextUrl.pathname);
  return NextResponse.next();
}