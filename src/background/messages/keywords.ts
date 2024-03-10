import { getCompletion } from "@/lib/openai"

import type { PlasmoMessaging } from "@plasmohq/messaging"

const getPrompt = (pageContent: string) => {
  return `You are given the content of the webpage. Your task is selecting some keywords in the page content to highlight.
Return a list of keywords separated by commas.

Page content:
${pageContent}
`
}

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  console.log("Received keywords message", req.body)

  const { pageContent } = req.body

  const prompt = getPrompt(pageContent)
  const completion = await getCompletion({ prompt })

  console.log("Completion:", completion)

  res.send({ keywords: completion.split(", ") })
}

export default handler
