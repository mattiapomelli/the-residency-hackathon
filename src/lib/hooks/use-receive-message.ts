import { Readability } from "@mozilla/readability"

import { useMessage } from "@plasmohq/messaging/hook"

export function useReceiveMessage() {
  return useMessage(async (req, res) => {
    if (req.name === "get-page-content") {
      res.send(document.body.innerText)
    }

    if (req.name === "get-article-info") {
      // Clone document to avoid side effects
      const documentClone = document.cloneNode(true) as Document
      const reader = new Readability(documentClone)
      const article = reader.parse()

      console.log("Article content: ", article)

      res.send(article)
    }
  })
}
