import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Note: Middleware in Next.js runs on the Edge runtime, which has limitations
// compared to the full Node.js environment. If you need to use Node.js-specific
// APIs, consider moving that logic to API routes or server-side components.

export async function middleware(request: NextRequest) {
  console.log('Middleware for', request.nextUrl.pathname);

  // Example of Edge-compatible operations:
  // - Basic request/response manipulation
  // - Simple logging (as shown above)
  // - Redirects
  // - Rewriting URLs
  // - Setting headers

  // For operations requiring Node.js APIs, consider:
  // 1. Moving the logic to API routes (/pages/api/*)
  // 2. Using server-side components for data fetching and processing
  // 3. Utilizing Edge-compatible alternatives when available

  return NextResponse.next();
}

// This configuration determines which routes the middleware applies to
export const config = {
  matcher: '*',
};
