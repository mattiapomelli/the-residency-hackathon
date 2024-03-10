import { getGoogleImages, getGoogleResults } from "@/lib/serp"

import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  console.log("Received info message", req.body)

  const { selectedText } = req.body

  const imageResults = await getGoogleImages(selectedText)

  res.send({ imageResults })
}

export default handler
