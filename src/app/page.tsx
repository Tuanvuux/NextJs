import Link from 'next/link'

export default function Home() {
  return <main>
    <ul>
      <h1>This is home page</h1>
      <li><Link href="/login">Login</Link></li>
      <li><Link href="/register">Register</Link></li>
    </ul>
  </main>
}
