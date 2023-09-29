export default function EmptyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <h1>Empty Layout</h1>
      {children}
    </div>
  )
}
