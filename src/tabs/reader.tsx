import { Providers } from "@/components/providers"

import "../globals.css"

import { ReaderPage } from "@/components/reader/reader-page"
import { SignedIn, SignedOut, SignIn, SignUp } from "@clerk/chrome-extension"
import { useEffect } from "react"
import { MemoryRouter, Route, Routes } from "react-router-dom"

export default function Reader() {
  const params = new URLSearchParams(window.location.search)
  const url = params.get("url")

  // Shortcuts
  useEffect(() => {
    const onEscKeyDown = (event) => {
      if (event.code === "KeyL" && event.altKey) {
        window.location.href = url
      }
    }

    document.addEventListener("keydown", onEscKeyDown)

    return () => {
      document.removeEventListener("keydown", onEscKeyDown)
    }
  }, [url])

  return (
    <MemoryRouter>
      <Providers>
        <div className="flex min-h-screen flex-col items-center justify-center bg-background">
          <Routes>
            <Route path="/sign-up/*" element={<SignUp signInUrl="/" />} />
            <Route
              path="/"
              element={
                <>
                  <SignedIn>
                    <ReaderPage url={url} />
                  </SignedIn>
                  <SignedOut>
                    <SignIn
                      afterSignInUrl={window.location.href}
                      signUpUrl="/sign-up"
                    />
                  </SignedOut>
                </>
              }
            />
          </Routes>
        </div>
      </Providers>
    </MemoryRouter>
  )
}
