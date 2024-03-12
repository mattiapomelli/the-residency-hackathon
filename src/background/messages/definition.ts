import { getCompletion } from "@/lib/openai"

import type { PlasmoMessaging } from "@plasmohq/messaging"

const getPrompt = (pageContent: string, selectedText: string) => {
  return `You are an assistant for a web page. You are given the content of the webpage and a piece of text that the user has selected.
  Your task is to provide a short definition the selected text. You can use the content of the webpage and your own knowledge to help you write the definition.

Page content:
${pageContent}

Selected text:
${selectedText}
`
}

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  console.log("Received definition message", req.body)

  const { selectedText, pageContent } = req.body

  const completion = await getCompletion({
    prompt: getPrompt(pageContent, selectedText)
  })

  res.send(completion)
}

export default handler
