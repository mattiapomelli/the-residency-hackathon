import { getCompletion } from "@/lib/openai"

import type { PlasmoMessaging } from "@plasmohq/messaging"

const getPrompt = (pageContent: string) => {
  return `You are given the content of a webpage. Your task is to select some keywords to highlight in the page so that the user can click on them to learn more about the topic, like it was a Wikipedia page.

Keywords should be:
- main keywords of the page
- concepts that the user may not know about or may want to learn more about
- names of people, places
- names of organizations, companies
- names of products, services
- subjects or topics
- anything else that could be interesting to click on and learn more about.

The keywords should match exactly the content of the page. They should be words or phrases that are literally mentioned in the page.
Try to select at least a few keywords per paragraph.

Your response should be JSON object with a "keywords" field which is an array of keywords, separated by commas.

Page content:
${pageContent}
`
}

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  console.log("Received keywords message", req.body)

  const { pageContent } = req.body

  const prompt = getPrompt(pageContent)

  console.log("Prompt:", prompt)
  const completion = await getCompletion({
    prompt,
    responseFormat: { type: "json_object" }
  })

  const keywords = JSON.parse(completion).keywords

  console.log("Completion:", completion)

  res.send({
    keywords: [
      ...keywords,
      "cybernetics",
      "architecture",
      "Boolean algebra",
      "Turing test",
      "California Bar",
      "computer language",
      "Judicial Decisions"
    ]
  })
}

export default handler
