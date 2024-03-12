import { CommandPopup } from "@/components/command-popup"
import { InfoCard } from "@/components/info-card"
import { Popup } from "@/components/popup"
import { Spinner } from "@/components/ui/spinner"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

export function ContentInner() {
  const popupRef = useRef(null)

  const [showHighlights, setShowHighlights] = useState(false)

  const [infoPopupStatus, setInfoPopupStatus] = useState({
    show: false,
    top: 0,
    left: 0,
    selectedText: ""
  })
  const [commandPopupStatus, setCommandPopupStatus] = useState({
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

  console.log("Keywords:", keywords)

  const showPopup = (top: number, left: number, selectedText: string) => {
    setInfoPopupStatus({ show: true, top, left, selectedText })
  }

  function highlightKeywords(keywords) {
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
            showPopup(
              rect.top + window.scrollY + rect.height,
              rect.left + window.scrollX,
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
          // console.log("Matched:", node.nodeValue)

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
    if (keywords?.length) {
      highlightKeywords(keywords)
    }
  }, [keywords])

  const toggleHighlights = async () => {
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
      })
      setShowHighlights(false)
    } else {
      highlightedKeywords.forEach((keyword) => {
        // @ts-ignore
        // keyword.style["text-decoration"] = "underline #368ff5"
        // @ts-ignore
        keyword.style["background-color"] = "#dae5f7"
        // @ts-ignore
        keyword.style["border-radius"] = "0.3rem"
      })
      setShowHighlights(true)
    }
  }

  useEffect(() => {
    const onTextSelected = () => {
      const selection = window.getSelection()
      const selectedText = selection.toString()

      if (!selectedText) {
        setCommandPopupStatus({
          show: false,
          top: 0,
          left: 0,
          selectedText: ""
        })
      }
    }

    document.addEventListener("mouseup", onTextSelected)

    return () => {
      document.removeEventListener("mouseup", onTextSelected)
    }
  }, [])

  // Shortcuts
  useEffect(() => {
    // Close popup when clicking Esc
    const onEscKeyDown = (event) => {
      console.log(event)

      if (event.key === "Escape") {
        setInfoPopupStatus({ ...infoPopupStatus, show: false })
        setCommandPopupStatus({ ...commandPopupStatus, show: false })
      }

      // if key is K, toggle highlighted keywords
      if (event.code === "KeyK" && event.altKey) {
        toggleHighlights()
      }

      // if key is K, toggle highlighted keywords
      if (event.code === "KeyE" && event.altKey) {
        const selection = window.getSelection()
        const selectedText = selection.toString()

        if (selectedText.length > 0) {
          // Get the position of the end of selected text
          const range = selection.getRangeAt(0)
          const rect = range.getBoundingClientRect()

          setCommandPopupStatus({
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
  }, [showHighlights])

  return (
    <>
      {isLoading && (
        <div className="fixed top-20 right-2.5 bg-background rounded-[0.8rem] py-2.5 px-4 text-sm">
          <div className="flex items-center gap-2">
            <Spinner />
            <span>Loading keywords...</span>
          </div>
        </div>
      )}

      {/* <div className="fixed top-20 right-2.5 bg-[#4ef5a4] rounded- p-2 px-3"> */}

      {/* : (
          <>
            {showHighlights && keywords ? (
              <button
                onClick={() => toggleHighlights()}
                className="rounded-md text-sm">
                Hide Keywords (Cmd + K)
              </button>
            ) : (
              <button
                onClick={() => toggleHighlights()}
                className="rounded-md text-sm">
                Show Keywords (Cmd + K)
              </button>
            )}
          </>
        )} */}
      {/* </div> */}
      {infoPopupStatus.show && showHighlights && (
        <Popup
          ref={popupRef}
          style={{
            position: "absolute",
            top: infoPopupStatus.top,
            left: infoPopupStatus.left
          }}
          onClose={() =>
            setInfoPopupStatus({ ...infoPopupStatus, show: false })
          }>
          <InfoCard selectedText={infoPopupStatus.selectedText} />
        </Popup>
      )}
      {commandPopupStatus.show && (
        <CommandPopup
          ref={popupRef}
          style={{
            position: "absolute",
            top: commandPopupStatus.top,
            left: commandPopupStatus.left
          }}
          selectedText={commandPopupStatus.selectedText}
          onClose={() =>
            setCommandPopupStatus({ ...commandPopupStatus, show: false })
          }
        />
      )}
    </>
  )
}
