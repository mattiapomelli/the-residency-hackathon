import { Spinner } from "@/components/ui/spinner"
import { useCompletion } from "ai/react/dist"
import { useEffect } from "react"

export function SummaryView({ text }: { text: string }) {
  const { completion, complete } = useCompletion({
    api: `${process.env.PLASMO_PUBLIC_API_URL}/completion/refactor`,
    body: {
      text,
      type: "summary"
    }
  })

  console.log("completion", completion)

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
      <h1 className="mb-2 text-xl font-bold">Summary</h1>
      <div className="prose">
        <p>{completion}</p>
      </div>
    </div>
  )
}
