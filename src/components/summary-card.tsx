import { Spinner } from "@/components/ui/spinner"
import { useQuery } from "@tanstack/react-query"

import { sendToBackground } from "@plasmohq/messaging"

interface SummaryCardProps {
  selectedText: string
}

export function SummaryCard({ selectedText }: SummaryCardProps) {
  const { data: summary, isFetching } = useQuery({
    queryKey: ["summary", selectedText],
    queryFn: async () => {
      const res = await sendToBackground({
        name: "summarize",
        body: {
          selectedText,
          pageContent: document.body.innerText
        }
      })

      return res.summary
    }
  })

  return (
    <div className="flex gap-4 flex-col">
      <div>
        <h4 className="font-bold text-lg mb-2">Summary</h4>
        {isFetching ? (
          <div className="flex justify-center py-4">
            <Spinner />
          </div>
        ) : (
          <p className="text-muted-foreground">{summary}</p>
        )}
      </div>
    </div>
  )
}
