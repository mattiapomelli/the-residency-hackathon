import { Spinner } from "@/components/ui/spinner"
import { useQuery } from "@tanstack/react-query"

import { sendToBackground } from "@plasmohq/messaging"

interface BulletPointsCardProps {
  selectedText: string
}

export function BulletPointsCard({ selectedText }: BulletPointsCardProps) {
  const { data: bulletPoints, isFetching } = useQuery({
    queryKey: ["bullet-points", selectedText],
    queryFn: async () => {
      const res = await sendToBackground({
        name: "bullet-points",
        body: {
          selectedText,
          pageContent: document.body.innerText
        }
      })

      return res
    }
  })

  const items = bulletPoints?.split("- ").filter(Boolean)

  return (
    <div className="flex gap-4 flex-col">
      <div>
        <h4 className="font-bold text-lg mb-2">Bullet points</h4>
        {isFetching ? (
          <div className="flex justify-center py-4">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {items.map((item) => (
              <div key={item} className="flex gap-2">
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "gray",
                    marginRight: "5px",
                    marginTop: "5px"
                  }}
                  className="shrink-0"></div>
                <p className="text-muted-foreground flex-1">{item}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
