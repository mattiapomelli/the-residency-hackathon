import { getCompletion } from "@/lib/openai"

import type { PlasmoMessaging } from "@plasmohq/messaging"

const getPrompt = (pageContent: string, selectedText: string) => {
  return `You are an assistant for a web page. You are given the content of the webpage and a piece of text that the user has selected.
Your task is to summarize the selected text with a few bullet points. You can use the content of the webpage and your own knowledge to help you write the bullet points.
Make sure to keep the bullet points concise and to the point.

Page content:
${pageContent}

Selected text:
${selectedText}
`
}

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  console.log("Received info message", req.body)

  const { selectedText, pageContent } = req.body

  const completion = await getCompletion({
    prompt: getPrompt(pageContent, selectedText)
  })

  // const [completion, googleResults] = await Promise.all([
  //   getCompletion({
  //     systemMessage: getSystemMessage(pageContent),
  //     prompt: getPrompt(selectedText)
  //   }),
  //   getGoogleResults(selectedText)
  // ])

  res.send(completion)
}

export default handler
