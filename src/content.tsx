import { CommandPopup } from "@/components/command-popup"
import Providers from "@/components/providers"
import cssText from "data-text:~globals.css"
import { useEffect, useState } from "react"

export function getStyle() {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

// Example usage: highlightKeywords(['keyword1', 'keyword2']);

export default function Content() {
  const [popupInfo, setPopupInfo] = useState({
    show: false,
    top: 0,
    left: 0,
    selectedText: ""
  })

  const showPopup = (top: number, left: number, selectedText: string) => {
    setPopupInfo({ show: true, top, left, selectedText })
  }

  function highlightKeywords(keywords) {
    console.log("Highlighting keywords:", keywords)

    // Ensure keywords is an array
    if (!Array.isArray(keywords)) {
      console.error("Keywords must be an array")
      return
    }

    // Escape keywords for use in RegExp
    const escapedKeywords = keywords.map((keyword) =>
      keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    )

    // Join keywords into a single regex pattern
    const keywordsPattern = escapedKeywords.join("|")
    const regex = new RegExp(`(${keywordsPattern})`, "gi")

    // Function to wrap matched keywords in a span
    const wrapMatches = (node) => {
      const tempDiv = document.createElement("div")
      tempDiv.innerHTML = node.nodeValue.replace(
        regex,
        `<span style="background-color: yellow; color: black;" class="highlighted-keyword">$1</span>`
      )

      while (tempDiv.firstChild) {
        // node.parentNode.insertBefore(tempDiv.firstChild, node)

        const child = tempDiv.firstChild
        // Check if the child is a span with the class 'highlighted-keyword'
        if (
          child.nodeType === 1 &&
          // @ts-ignore
          child.classList.contains("highlighted-keyword")
        ) {
          // Add mouseover event listener to the span
          child.addEventListener("mouseover", (event) => {
            // @ts-ignore
            const rect = child.getBoundingClientRect()
            showPopup(
              rect.top + window.scrollY + rect.height,
              rect.left + window.scrollX - rect.width / 2,
              child.textContent
            )
          })
        }
        node.parentNode.insertBefore(child, node)
      }
      node.parentNode.removeChild(node)
    }

    // Recursively search text nodes and wrap matches
    const searchAndHighlight = (node) => {
      if (node.nodeType === 3) {
        // Text node
        if (node.nodeValue.match(regex)) {
          console.log("Matched:", node.nodeValue)

          wrapMatches(node)
        }
      } else if (
        node.nodeType === 1 &&
        node.nodeName !== "SCRIPT" &&
        node.nodeName !== "STYLE"
      ) {
        // Element node but not <script> or <style>
        for (let i = 0; i < node.childNodes.length; i++) {
          searchAndHighlight(node.childNodes[i])
        }
      }
    }

    searchAndHighlight(document.body)
  }

  useEffect(() => {
    highlightKeywords(["agents"])
  }, [])

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
