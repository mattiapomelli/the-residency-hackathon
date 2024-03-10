import { getCompletion } from "@/lib/openai"

import type { PlasmoMessaging } from "@plasmohq/messaging"

const getSystemMessage = (pageContent: string) => {
  return `You are an assistant for a web page. You are given the content of the webpage and your goal is to provide a short definition of a term or phrase selected by the user on the page.
Use your knowledge and the information on the page to provide a definition that is helpful and informative.

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

  res.send({ text: completion })
}

export default handler
