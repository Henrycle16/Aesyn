export default function SignupLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section className="container">
      {children}
    </section>
  )
}