import NextLink from 'next/link'

export default async function EmptyPage() {
  return (
    <main>
      <h2>Empty Page</h2>
      <NextLink href="/">Home</NextLink>
    </main>
  )
}
