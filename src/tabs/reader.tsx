import { Providers } from "@/components/providers"

import "../globals.css"

import { ReaderPage } from "@/reader/reader-page"
import { SignedIn, SignedOut, SignIn, SignUp } from "@clerk/chrome-extension"
import { MemoryRouter, Route, Routes } from "react-router-dom"

export default function Reader() {
  const params = new URLSearchParams(window.location.search)
  const url = params.get("url")

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
                      afterSignInUrl="https://getrabbithole.vercel.app/"
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
