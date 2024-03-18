import { Spinner } from "@/components/ui/spinner"
import { useCompletion } from "ai/react/dist"
import { useEffect } from "react"

interface TranslationViewProps {
  text: string
  language?: string
}

export function TranslationView({ text, language }: TranslationViewProps) {
  const { completion, complete } = useCompletion({
    api: `${process.env.PLASMO_PUBLIC_API_URL}/completion/refactor`,
    body: {
      text,
      type: "translate",
      language
    }
  })

  useEffect(() => {
    complete("")
  }, [complete, text])

  if (!completion) {
    return (
      <div className="flex justify-center py-4">
        <Spinner />
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-2 text-xl font-bold">Translation to {language}</h1>
      <div className="prose">
        <p>{completion}</p>
      </div>
    </div>
  )
}
