import { Providers } from "@/components/providers"

import "./globals.css"

import { Button } from "@/components/ui/button"
import { PopupPage } from "@/popup/popup-page"
import { SignedIn, SignedOut } from "@clerk/chrome-extension"
import { MemoryRouter } from "react-router-dom"

function Popup() {
  return (
    <MemoryRouter>
      <Providers>
        <SignedIn>
          <div>
            <PopupPage />
          </div>
        </SignedIn>
        <SignedOut>
          <div className="w-[300px] p-4">
            <a
              href="chrome-extension://efloenknocfldgbmmjnhlonilnncpffi/options.html#/factor-one"
              target="_blank"
              rel="noopener noreferrer">
              <Button>Sign in</Button>
            </a>
          </div>
        </SignedOut>
      </Providers>
    </MemoryRouter>
  )
}

export default Popup
