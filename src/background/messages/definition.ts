import { getCompletion } from "@/lib/openai"
import { getGoogleResults } from "@/lib/serp"

import type { PlasmoMessaging } from "@plasmohq/messaging"

// If you think you can answer on your own, use your knowledge. If you need help, use the content of the article.

const getPrompt = (
  pageContent: string,
  selectedText: string,
  googleDescription: string
) => {
  return `You goal is to help a user understanding an article on the web better.
You are given a piece of text that the user wants to learn more about.
Your task is to provide a short definition of the selected text that is easy to understand for the user.

You have as sources of information the content of the webpage containing the article and optionally the knowledge graph description from Google search results.
The google search result might be useful to provide a definition if you don't know the answer, but it also might be irrelevant or misleading.
If the google search result is not relevant to the content of the article, you should ignore it and provide the definition based on your own knowledge.

Keep the definition short and to the point. The definition should be maximum 60 words long and maximum 2-3 sentences.
You can use the your own knowledge to provide the definition as well as the content of the article.
Don't just copy the definition from the article, add your own explanation based on your knowledge if necessary.
Go straight to the definition, no introduction is necessary.

Page content:
${pageContent}

Google description:
${googleDescription}

Selected text:
${selectedText}
`
}

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  console.log("Received definition message", req.body)

  const { selectedText, pageContent } = req.body

  const googleResults = await getGoogleResults(selectedText)

  const completion = await getCompletion({
    prompt: getPrompt(
      pageContent,
      selectedText,
      googleResults.knowledge_graph?.description ?? ""
    ),
    maxTokens: 300
  })

  res.send(completion)
}

export default handler
