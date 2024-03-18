import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Article } from "@/types"
import { useChat } from "ai/react"
import { useEffect, useRef } from "react"

interface ChatViewProps {
  article: Article
}

export function ChatView({ article }: ChatViewProps) {
  const messagesEndRef = useRef(null)
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: `${process.env.PLASMO_PUBLIC_API_URL}/chat`,
    onFinish: async () => {},
    body: {
      url: article.url
    }
  })

  const scrollToBottom = () => {
    // Scrolls the element to its bottom
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  // Scrolls to bottom on initial render and whenever component updates
  useEffect(() => {
    scrollToBottom()
  })

  return (
    <div className="flex max-h-full flex-1 flex-col justify-between">
      <div className="flex flex-1 flex-col gap-4 overflow-auto px-4 pb-10">
        {messages.map((message) => (
          <div key={message.id}>
            <div className="text-lg font-bold">
              {message.role === "user" ? "You" : "Assistant"}
            </div>

            <div className="prose">{message.content}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-auto flex items-center gap-3 px-4">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask something..."
        />
        <Button type="submit" variant="accent">
          Submit
        </Button>
      </form>
    </div>
  )
}
