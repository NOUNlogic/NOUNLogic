# Build Error Fix Summary

## Problem
The application was failing to build with the following error:
```
Error occurred prerendering page "/institutions"
RangeError: Maximum call stack size exceeded
```

## Root Causes

### 1. MainLayout.tsx - Infinite Loop in useEffect
**Location**: `src/components/layout/MainLayout.tsx`

**Issue**: The useEffect hook had `sidebarOpen` in its dependency array, but the effect itself could update `sidebarOpen`. This created an infinite loop:
```tsx
useEffect(() => {
  const checkIfMobile = () => {
    // ... code that updates sidebarOpen based on conditions
    if (!mobile && !sidebarOpen) {
      setSidebarOpen(true);
    } else if (mobile && sidebarOpen) {
      setSidebarOpen(false);
    }
  };
  // ... 
}, [sidebarOpen]); // ❌ This dependency causes infinite loop
```

**Fix**: Removed `sidebarOpen` from dependencies and simplified the logic to always set the state based on mobile/desktop:
```tsx
useEffect(() => {
  const checkIfMobile = () => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    setSidebarOpen(!mobile); // ✅ Simplified - always set based on screen size
  };
  // ...
}, []); // ✅ Empty dependency array - runs once on mount and on resize events
```

### 2. auth-context.tsx - Duplicate 'use client' Directive
**Location**: `src/lib/appwrite/auth-context.tsx`

**Issue**: File had two `'use client'` directives at the top
```tsx
'use client';
'use client'; // ❌ Duplicate
```

**Fix**: Removed the duplicate directive
```tsx
'use client'; // ✅ Single directive
```

### 3. Static Site Generation (SSG) Issues
**Issue**: Next.js was attempting to statically generate pages at build time that require:
- Client-side state management
- Browser APIs (window, localStorage, etc.)
- Authentication context
- Dynamic routing

This caused errors during SSR/prerendering phase.

**Fix**: Added `export const dynamic = 'force-dynamic'` to all relevant pages to force server-side rendering instead of static generation:

#### Pages Updated:
- `src/app/page.tsx` (home/redirect)
- `src/app/not-found.tsx`
- `src/app/login/page.tsx`
- `src/app/register/page.tsx`
- `src/app/dashboard/page.tsx`
- `src/app/institutions/page.tsx`
- `src/app/courses/page.tsx`
- `src/app/ai/page.tsx`
- `src/app/web3/page.tsx`
- `src/app/integrations/page.tsx`
- `src/app/profile/page.tsx`
- `src/app/feed/page.tsx`
- `src/app/groups/page.tsx`
- `src/app/messages/page.tsx`
- `src/app/people/page.tsx`
- `src/app/studio/page.tsx`
- `src/app/admin/page.tsx`
- `src/app/admin/cohorts/page.tsx`
- `src/app/admin/institution/page.tsx`

## Build Result

### Before Fix:
```
Error occurred prerendering page "/institutions"
RangeError: Maximum call stack size exceeded
Build failed
```

### After Fix:
```
✓ Compiled successfully in 17.0s
✓ Generating static pages (8/8)
✓ Finalizing page optimization

30 routes successfully built (all marked as dynamic ƒ)
```

## Technical Details

### Why `force-dynamic` Was Necessary
The pages in this application:
1. Use `MainLayout` which has client-side hooks (`useState`, `useEffect`)
2. Access browser APIs like `window.innerWidth`
3. Require authentication context that depends on client-side state
4. Have dynamic content that changes based on user session

Static Site Generation (SSG) runs these components during build time in a Node.js environment where:
- Browser APIs are not available
- Client-side state cannot be properly initialized
- React hooks behave differently than in the browser

By using `force-dynamic`, we tell Next.js to:
- Skip static generation at build time
- Render these pages on-demand on the server
- Allow proper client-side hydration with browser APIs

### Trade-offs
- **Static Generation (SSG)**: Faster initial page load, but requires all data at build time
- **Dynamic Rendering**: Slightly slower initial load, but allows for dynamic content and proper client-side features

For this application, dynamic rendering is the correct choice because:
- Authentication is required
- User-specific content is displayed
- Real-time data fetching is needed
- Client-side interactions are essential

## Verification
Build now completes successfully with all routes rendering correctly.
