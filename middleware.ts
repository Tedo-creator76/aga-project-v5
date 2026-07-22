import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Routes publiques (pas besoin d'auth)
  const publicRoutes = ['/', '/auth/login', '/auth/signup']
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Routes protégées (nécessitent une session)
  const protectedRoutes = ['/projets']
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route))

  if (!isProtected) {
    return NextResponse.next()
  }

  // Vérifier la session Supabase
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Pas de session → rediriger vers login
  if (!user) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg).*)',
  ],
}
