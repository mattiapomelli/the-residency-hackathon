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

  return (
    <div>
      <h1 className="mb-2 text-xl font-bold">Summary</h1>
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
