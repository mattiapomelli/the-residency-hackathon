import { getGoogleResults } from "@/lib/serp"

import type { PlasmoMessaging } from "@plasmohq/messaging"

const getPrompt = (selectedText: string) => {
  return `Give a short definition of ${selectedText}`
}

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  console.log("Received info message", req.body)

  const { selectedText } = req.body

  const googleResults = await getGoogleResults(selectedText)

  res.send({ googleResults })
}

export default handler
