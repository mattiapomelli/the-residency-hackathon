import { useCallback } from "react"

interface UseHighlightKeywordsParams {
  rootElement: HTMLElement
  onMouseOver?: (event: MouseEvent) => void
  onMouseLeave?: (event: MouseEvent) => void
}

export function useHighlightKeywords({
  rootElement,
  onMouseLeave,
  onMouseOver
}: UseHighlightKeywordsParams) {
  const highlightKeywords = useCallback(
    (keywords) => {
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
            child.addEventListener("mouseover", (event: MouseEvent) => {
              onMouseOver?.(event)
            })

            // Add mouseover event listener to the span
            child.addEventListener("mouseleave", (event: MouseEvent) => {
              onMouseLeave?.(event)
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

      searchAndHighlight(rootElement)
    },
    [rootElement, onMouseOver, onMouseLeave]
  )

  return highlightKeywords
}
