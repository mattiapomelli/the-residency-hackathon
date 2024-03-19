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
  }, [complete, text, language])

  return (
    <div className="px-4">
      <h1 className="mb-2 text-xl font-bold">Translation to {language}</h1>
      {completion ? (
        <div className="prose">
          <p>{completion}</p>
        </div>
      ) : (
        <div className="flex justify-center py-8">
          <Spinner />
        </div>
      )}
    </div>
  )
}
