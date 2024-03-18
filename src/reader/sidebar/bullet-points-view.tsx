import { Spinner } from "@/components/ui/spinner"
import { useCompletion } from "ai/react/dist"
import { useEffect } from "react"

export function BulletPointsView({ text }: { text: string }) {
  const { completion, complete } = useCompletion({
    api: `${process.env.PLASMO_PUBLIC_API_URL}/completion/refactor`,
    body: {
      text,
      type: "bullet_points"
    }
  })

  useEffect(() => {
    complete("")
  }, [complete, text])

  const bulletPoints = completion?.split("- ").filter(Boolean)

  if (!completion) {
    return (
      <div className="flex justify-center py-4">
        <Spinner />
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-2 text-xl font-bold">Bullet Points</h1>

      <div className="prose">
        <ul>
          {bulletPoints.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
