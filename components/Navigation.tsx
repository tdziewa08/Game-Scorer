import Link from 'next/link'
import { getUser, handleSignout } from '@/app/auth/actions'

export default async function Navigation() {
  const user = await getUser()

  return (
    <nav className="navBar">
      <Link href="/">Home</Link>
      <Link href="/blogs">Posts</Link>
      {user === null
       ? 
       <>
        <Link href="/sign-in">Sign In</Link>
        <Link href="/sign-up">Sign Up</Link>
       </>
       :
       <>
        <Link href={`/users/${user.id}`}>{user.user_metadata.display_name}</Link>
        <form action={handleSignout}>
          <button className="signoutBtn" type="submit">Sign Out</button>
        </form>
       </>
      }
    </nav>
  )
}

export function NavigationFallback() {
  return (
    <nav className="navBar">
      <Link href="/">Home</Link>
      <Link href="/blogs">Posts</Link>
      <Link href="/sign-in">Sign In</Link>
      <Link href="/sign-up">Sign Up</Link>
    </nav>
  )
}