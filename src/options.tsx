import { Providers } from "@/components/providers"

import "./globals.css"

import { OptionsPage } from "@/options/options-page"
import { SignedIn, SignedOut, SignIn, SignUp } from "@clerk/chrome-extension"
import ky from "ky"
import { useEffect } from "react"
import { MemoryRouter, Route, Routes } from "react-router-dom"

const VOICE_ID = "21m00Tcm4TlvDq8ikWAM"

export default function Options() {
  useEffect(() => {
    const getStuff = async () => {
      const stuff = await ky
        .post(`http://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/stream`, {
          json: {
            text: "Hello, world!"
          },
          timeout: 60000,
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": process.env.PLASMO_PUBLIC_ELEVENLABS_API_KEY
          }
        })
        .blob()

      console.log("Stuff: ", stuff)
    }

    getStuff()
  }, [])

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
