import { CommandPopup } from "@/components/command-popup"
import Providers from "@/components/providers"
import cssText from "data-text:~globals.css"
import { useEffect, useState } from "react"

export function getStyle() {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export default function Content() {
  const [popupInfo, setPopupInfo] = useState({
    show: false,
    top: 0,
    left: 0,
    selectedText: ""
  })

  useEffect(() => {
    const onTextSelected = (event: MouseEvent) => {
      const selection = window.getSelection()
      const selectedText = selection.toString()

      console.log("Selection:", selection)

      if (selectedText.length > 0) {
        // Option 2
        // const selectionNode = selection?.anchorNode?.parentNode
        // // @ts-ignore
        // const rect = selectionNode.getBoundingClientRect()

        // Option 2
        // const range = selection.getRangeAt(0)
        // // Get the bounding rectangle of the range
        // const rect = range.getBoundingClientRect()

        // Option 3
        const top = event.clientY + window.scrollY
        const left = event.clientX + window.scrollX

        setPopupInfo({
          show: true,
          top,
          left,
          selectedText
          // top: rect.top + window.scrollY + rect.height, // Adjust these calculations as needed
          // left: rect.left + window.scrollX + rect.width
        })

        // Text has been selected
        console.log(selectedText)
      }
    }

    document.addEventListener("mouseup", onTextSelected)

    return () => {
      document.removeEventListener("mouseup", onTextSelected)
    }
  }, [])

  const onPopupClose = () => {
    setPopupInfo({ ...popupInfo, show: false })
  }

  return (
    <Providers>
      {popupInfo.show && (
        <CommandPopup
          style={{
            position: "absolute",
            top: popupInfo.top,
            left: popupInfo.left
          }}
          selectedText={popupInfo.selectedText}
          onClose={onPopupClose}
        />
      )}
    </Providers>
  )
}
