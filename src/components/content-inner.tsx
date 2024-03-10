import { CommandPopup } from "@/components/command-popup"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

export function ContentInner() {
  const popupRef = useRef(null)
  const [popupInfo, setPopupInfo] = useState({
    show: false,
    top: 0,
    left: 0,
    selectedText: ""
  })

  const { data: keywords, isFetching } = useQuery({
    queryKey: ["keywords", window.origin],
    queryFn: async () => {
      const res = await sendToBackground({
        name: "keywords",
        body: {
          pageContent: document.body.innerText
        }
      })

      return res.keywords as string[]
    }
  })

  const showPopup = (top: number, left: number, selectedText: string) => {
    setPopupInfo({ show: true, top, left, selectedText })
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
    const regex = new RegExp(`(${keywordsPattern})`, "gi")

    // Function to wrap matched keywords in a span
    const wrapMatches = (node) => {
      const tempDiv = document.createElement("div")
      tempDiv.innerHTML = node.nodeValue.replace(
        regex,
        `<span style="text-decoration: underline #f2e485; cursor: pointer;" class="highlighted-keyword">$1</span>`
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

  useEffect(() => {
    const onTextSelected = (event: MouseEvent) => {
      const selection = window.getSelection()
      const selectedText = selection.toString()

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
      }
    }

    document.addEventListener("mouseup", onTextSelected)

    return () => {
      document.removeEventListener("mouseup", onTextSelected)
    }
  }, [])

  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (popupRef.current && !popupRef.current.contains(event.target)) {
  //       setPopupInfo({ ...popupInfo, show: false })
  //     }
  //   }
  //   // Bind the event listener
  //   document.addEventListener("mouseup", handleClickOutside)

  //   return () => {
  //     // Unbind the event listener on clean up
  //     document.removeEventListener("mouseup", handleClickOutside)
  //   }
  // }, [])

  const onPopupClose = () => {
    setPopupInfo({ ...popupInfo, show: false })
  }

  return (
    <>
      {popupInfo.show && (
        <CommandPopup
          ref={popupRef}
          style={{
            position: "absolute",
            top: popupInfo.top,
            left: popupInfo.left
          }}
          selectedText={popupInfo.selectedText}
          onClose={onPopupClose}
        />
      )}
    </>
  )
}
