import { BackButton } from "@/components/back-button"
import { Spinner } from "@/components/ui/spinner"
import { useQuery } from "@tanstack/react-query"

import { sendToBackground } from "@plasmohq/messaging"

interface BulletPointsPopupContentProps {
  selectedText: string
  onBack: () => void
}

export function BulletPointsPopupContent({
  selectedText,
  onBack
}: BulletPointsPopupContentProps) {
  const { data: bulletPoints, isPending } = useQuery({
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
    },
    staleTime: Infinity
  })

  const items = bulletPoints?.split("- ").filter(Boolean)

  return (
    <div className="flex flex-col gap-4 px-4">
      <div>
        <BackButton onClick={onBack} />
      </div>
      {isPending ? (
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
                className="shrink-0"
              />
              <p className="flex-1">{item}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
