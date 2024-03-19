import { Providers } from "@/components/providers"

import "./globals.css"

import { OptionsPage } from "@/options/options-page"
import { SignedIn, SignedOut, SignIn, SignUp } from "@clerk/chrome-extension"
import { MemoryRouter, Route, Routes } from "react-router-dom"

export default function Options() {
  return (
    <MemoryRouter>
      <Providers>
        <div className="flex min-h-screen flex-col items-center justify-center">
          <Routes>
            <Route path="/sign-up/*" element={<SignUp signInUrl="/" />} />
            <Route
              path="/"
              element={
                <>
                  <SignedIn>
                    <OptionsPage />
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
