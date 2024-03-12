import { getCompletion } from "@/lib/openai"

import type { PlasmoMessaging } from "@plasmohq/messaging"

const getPrompt = (
  pageContent: string,
  selectedText: string,
  language: string
) => {
  return `You are an assistant for a web page. You are given the content of the webpage and a piece of text that the user has selected.
Your task is to translate the selected text to ${language}. You can use the content of the webpage and your own knowledge to help you write the translation.

Page content:
${pageContent}

Selected text:
${selectedText}
`
}

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { selectedText, pageContent, language } = req.body

  const completion = await getCompletion({
    prompt: getPrompt(pageContent, selectedText, language)
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
