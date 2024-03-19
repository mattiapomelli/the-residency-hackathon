import { Providers } from "@/components/providers"

import "./globals.css"

import { Instructions } from "@/components/instructions"
import { PopupPage } from "@/components/popup/popup-page"
import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut } from "@clerk/chrome-extension"
import { MemoryRouter } from "react-router-dom"

function Popup() {
  return (
    <MemoryRouter>
      <Providers>
        <SignedIn>
          <div className="min-h-[300px] w-[400px] p-4">
            <PopupPage />
          </div>
        </SignedIn>
        <SignedOut>
          <div className="min-h-[300px] w-[400px] p-4">
            <Button
              onClick={() => {
                chrome.tabs.create({ url: "options.html" })
              }}
              className="mb-4">
              Sign in to use RabbitHole
            </Button>
            <Instructions />
          </div>
        </SignedOut>
      </Providers>
    </MemoryRouter>
  )
}

export default Popup
