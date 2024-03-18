import { ClerkProvider } from "@clerk/chrome-extension"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { type ReactNode } from "react"
import { useNavigate } from "react-router-dom"

const queryClient = new QueryClient()

const publishableKey = process.env.PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY

export function Providers({ children }: { children: ReactNode }) {
  const navigate = useNavigate()

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      navigate={(to) => navigate(to)}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ClerkProvider>
  )
}
