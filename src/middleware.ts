import { auth } from './auth';
import { NextRequest, NextResponse } from 'next/server';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  PATH_ADMIN,
  PATH_ADMIN_PHOTOS,
  PREFIX_PHOTO,
  PREFIX_TAG,
} from './site/paths';

/**
 * Middleware function to handle URL rewriting and redirection
 * @param req - The incoming request object
 * @param res - The outgoing response object
 */
export default function middleware(req: NextRequest, res:NextResponse) {
  // Extract the pathname from the request URL
  const pathname = req.nextUrl.pathname;

  // Redirect to PATH_ADMIN_PHOTOS if the pathname is PATH_ADMIN
  if (pathname === PATH_ADMIN) {
    return NextResponse.redirect(new URL(PATH_ADMIN_PHOTOS, req.url));
  } 
  // Rewrite /photos/* paths to /p/*
  else if (/^\/photos\/(.)+$/.test(pathname)) {
    const matches = pathname.match(/^\/photos\/(.+)$/);
    return NextResponse.rewrite(new URL(
      `${PREFIX_PHOTO}/${matches?.[1]}`,
      req.url,
    ));
  } 
  // Rewrite /t/* paths to /tag/*
  else if (/^\/t\/(.)+$/.test(pathname)) {
    const matches = pathname.match(/^\/t\/(.+)$/);
    return NextResponse.rewrite(new URL(
      `${PREFIX_TAG}/${matches?.[1]}`,
      req.url,
    ));
  }

  // Call the auth function for other paths
  return auth(
    req as unknown as NextApiRequest,
    res as unknown as NextApiResponse,
  );
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
