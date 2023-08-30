import { metadata } from './layout'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <img
        alt={metadata.title}
        width="256"
        height="256"
        className="rounded-full border-4 border-current"
        src={`https://github.com/matthieusieben.png?${Date.now()}`}
      />
      <p className="text-4xl">{metadata.title}</p>
      <p className="text-xl">{metadata.description}</p>
    </main>
  )
}
