import { ContentInner } from "@/components/content-inner"
import { Providers } from "@/components/providers"
import { useReceiveMessage } from "@/lib/hooks/use-receive-message"
import cssText from "data-text:~globals.css"
import type { PlasmoCSConfig } from "plasmo"

export function getStyle() {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const config: PlasmoCSConfig = {
  css: ["font.css"]
}

export default function Content() {
  useReceiveMessage()

  return (
    <Providers>
      <ContentInner />
    </Providers>
  )
}
