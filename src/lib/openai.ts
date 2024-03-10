import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.PLASMO_PUBLIC_OPENAI_API_KEY
})

interface Message {
  role: "system" | "user"
  content: string
}

interface CompletionOptions {
  systemMessage?: string
  prompt: string
}

export async function getCompletion({
  systemMessage,
  prompt
}: CompletionOptions) {
  const messages: Message[] = []

  if (systemMessage) {
    messages.push({ role: "system", content: systemMessage })
  }

  messages.push({ role: "user", content: prompt })

  const res = await openai.chat.completions.create({
    messages,
    model: "gpt-3.5-turbo",
    temperature: 0
    // response_format: { type: "json_object" },
  })

  return res.choices[0].message.content
}
