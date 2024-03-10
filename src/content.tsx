import { ContentInner } from "@/components/content-inner"
import Providers from "@/components/providers"
import cssText from "data-text:~globals.css"

export function getStyle() {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export default function Content() {
  return (
    <Providers>
      <ContentInner />
    </Providers>
  )
}
