import Providers from "@/components/providers"

import "./globals.css"

import { PopupPage } from "@/popup/popup-page"

function Popup() {
  return (
    <Providers>
      <PopupPage />
    </Providers>
  )
}

export default Popup
