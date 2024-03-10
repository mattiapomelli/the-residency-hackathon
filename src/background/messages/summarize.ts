import { getCompletion } from "@/lib/openai"

import type { PlasmoMessaging } from "@plasmohq/messaging"

const getSystemMessage = (pageContent: string) => {
  return `You are an assistant for a web page. You are given the content of the webpage and a piece of text that the user has selected.
Your goal is to summarize the selected text in a way that is easy to understand for the user. You can use the content of the webpage and your own knowledge to help you write the summary. Make sure to keep the summary short and to the point.

Page content:
${pageContent}
`
}

const getPrompt = (selectedText: string) => {
  return `Give a short definition of ${selectedText}`
}

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  console.log("Received info message", req.body)

  const { selectedText, pageContent } = req.body

  const completion = await getCompletion({
    systemMessage: getSystemMessage(pageContent),
    prompt: getPrompt(selectedText)
  })

  // const [completion, googleResults] = await Promise.all([
  //   getCompletion({
  //     systemMessage: getSystemMessage(pageContent),
  //     prompt: getPrompt(selectedText)
  //   }),
  //   getGoogleResults(selectedText)
  // ])

  res.send({ summary: completion })
}

export default handler
