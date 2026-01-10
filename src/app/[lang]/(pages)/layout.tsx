/**
 * Pages Layout for Language Routes
 * 
 * This is a pass-through layout for the (pages) route group.
 * Navigation and Footer are already provided by the root layout.
 */

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Just pass through children - root layout already provides nav/footer
  return <>{children}</>
}