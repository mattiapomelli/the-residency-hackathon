import { CommandsPopup } from "@/components/popups/commands-popup/commands-popup"
import { ExplorePopupContent } from "@/components/popups/explore-popup/explore-popup-content"
import { Popup } from "@/components/ui/popup"
import { Spinner } from "@/components/ui/spinner"
import { useQuery } from "@tanstack/react-query"
import { useCallback, useEffect, useRef, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

export function ContentInner() {
  const explorePopupRef = useRef(null)

  const [showHighlights, setShowHighlights] = useState(false)

  const [infoPopupStatus, setInfoPopupStatus] = useState({
    show: false,
    top: 0,
    left: 0,
    selectedText: ""
  })
  const [commandsPopupStatus, setCommandsPopupStatus] = useState({
    show: false,
    top: 0,
    left: 0,
    selectedText: ""
  })

  const {
    data: keywords,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ["keywords", window.origin],
    queryFn: async () => {
      const res = await sendToBackground({
        name: "keywords",
        body: {
          pageContent: document.body.innerText
        }
      })

      return res.keywords as string[]
    },
    enabled: false
  })

  const highlightKeywords = useCallback((keywords) => {
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
    const regex = new RegExp(`\\b(${keywordsPattern})\\b`, "gi")

    // Function to wrap matched keywords in a span
    const wrapMatches = (node) => {
      const tempDiv = document.createElement("div")
      tempDiv.innerHTML = node.nodeValue.replace(
        regex,
        `<span style="cursor: pointer;" class="highlighted-keyword">$1</span>`
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
          child.addEventListener("mouseover", () => {
            // @ts-ignore
            const rect = child.getBoundingClientRect()
            setInfoPopupStatus({
              show: true,
              top: rect.top + window.scrollY + rect.height,
              left: rect.left + window.scrollX,
              selectedText: child.textContent
            })
          })

          // Add mouseover event listener to the span
          child.addEventListener("mouseleave", (event) => {
            // Check if mouse is leaving from the top of the element
            if (
              // @ts-ignore
              event.clientY <
              explorePopupRef.current.getBoundingClientRect().top - 5
            ) {
              setInfoPopupStatus({
                show: false,
                top: 0,
                left: 0,
                selectedText: ""
              })
            }
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
  }, [])

  useEffect(() => {
    if (keywords?.length) {
      highlightKeywords(keywords)
    }
  }, [keywords, highlightKeywords])

  const toggleHighlights = useCallback(async () => {
    if (!keywords) {
      const { data } = await refetch()
      highlightKeywords(data)
    }

    const highlightedKeywords = document.querySelectorAll(
      ".highlighted-keyword"
    )

    if (showHighlights) {
      highlightedKeywords.forEach((keyword) => {
        // @ts-ignore
        // keyword.style["text-decoration"] = "none"
        // @ts-ignore
        keyword.style["background-color"] = "transparent"
        // @ts-ignore
        keyword.style["color"] = ""
      })
      setShowHighlights(false)
    } else {
      highlightedKeywords.forEach((keyword) => {
        // @ts-ignore
        // keyword.style["text-decoration"] = "underline #368ff5"
        // @ts-ignore
        keyword.style["background-color"] = "#dae5f7"
        // @ts-ignore
        keyword.style["color"] = "#000000"
        // @ts-ignore
        keyword.style["border-radius"] = "0.3rem"
      })
      setShowHighlights(true)
    }
  }, [keywords, refetch, highlightKeywords, showHighlights])

  // Shortcuts
  useEffect(() => {
    // Close popup when clicking Esc
    const onEscKeyDown = (event) => {
      if (event.key === "Escape") {
        setInfoPopupStatus({ ...infoPopupStatus, show: false })
        setCommandsPopupStatus({ ...commandsPopupStatus, show: false })
      }

      // if key is K, toggle highlighted keywords
      if (event.code === "KeyK" && event.altKey) {
        toggleHighlights()
      }

      // if key is K, toggle highlighted keywords
      if (event.code === "KeyL" && event.altKey) {
        const selection = window.getSelection()
        const selectedText = selection.toString()

        if (selectedText.length > 0) {
          // Get the position of the end of selected text
          const range = selection.getRangeAt(0)
          const rect = range.getBoundingClientRect()

          setCommandsPopupStatus({
            show: true,
            top: rect.top + window.scrollY + rect.height,
            left: rect.left + window.scrollX + rect.width,
            selectedText
          })
        }
      }
    }

    document.addEventListener("keydown", onEscKeyDown)

    return () => {
      document.removeEventListener("keydown", onEscKeyDown)
    }
  }, [commandsPopupStatus, infoPopupStatus, toggleHighlights])

  return (
    <>
      {isLoading && (
        <Popup className="fixed right-2.5 top-20 w-auto bg-card px-4 py-2.5 text-sm">
          <div className="flex items-center gap-2">
            <Spinner />
            <span>Loading keywords...</span>
          </div>
        </Popup>
      )}

      {infoPopupStatus.show && showHighlights && (
        <Popup
          ref={explorePopupRef}
          style={{
            position: "absolute",
            top: infoPopupStatus.top,
            left: infoPopupStatus.left
          }}
          onMouseLeave={() =>
            setInfoPopupStatus({ ...infoPopupStatus, show: false })
          }
          onClose={() =>
            setInfoPopupStatus({ ...infoPopupStatus, show: false })
          }>
          <ExplorePopupContent selectedText={infoPopupStatus.selectedText} />
        </Popup>
      )}
      {commandsPopupStatus.show && (
        <CommandsPopup
          style={{
            position: "absolute",
            top: commandsPopupStatus.top,
            left: commandsPopupStatus.left
          }}
          selectedText={commandsPopupStatus.selectedText}
          onClose={() =>
            setCommandsPopupStatus({ ...commandsPopupStatus, show: false })
          }
        />
      )}
    </>
  )
}
