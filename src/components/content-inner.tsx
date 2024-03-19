import { useCallback, useEffect } from "react"

export function ContentInner() {
  const toggleFocusMode = useCallback(() => {
    window.location.href = `chrome-extension://${chrome.runtime.id}/tabs/reader.html?url=${encodeURIComponent(window.location.href)}`
  }, [])

  useEffect(() => {
    // Close popup when clicking Esc
    const onEscKeyDown = (event) => {
      // if key is K, toggle highlighted keywords
      if (event.code === "KeyL" && event.altKey) {
        toggleFocusMode()
      }
    }

    document.addEventListener("keydown", onEscKeyDown)

    return () => {
      document.removeEventListener("keydown", onEscKeyDown)
    }
  }, [toggleFocusMode])

  useEffect(() => {
    const onMessage = (event) => {
      if (event.data === "close-iframe") {
        toggleFocusMode()
      }
    }

    // Listen for messages from the iframe
    window.addEventListener("message", onMessage)

    return () => window.removeEventListener("message", onMessage)
  }, [toggleFocusMode])

  return null
}
