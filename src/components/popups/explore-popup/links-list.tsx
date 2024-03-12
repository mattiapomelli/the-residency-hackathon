import { Card } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import type { GoogleSearchResponse } from "@/lib/serp"
import { useQuery } from "@tanstack/react-query"

import { sendToBackground } from "@plasmohq/messaging"

export function LinksList({ selectedText }: { selectedText: string }) {
  const { data: googleResults, isPending } = useQuery({
    queryKey: ["links", selectedText],
    queryFn: async () => {
      const res = await sendToBackground({
        name: "google-results",
        body: {
          selectedText,
          pageContent: document.body.innerText
        }
      })

      return res.googleResults as GoogleSearchResponse
    },
    staleTime: Infinity
  })

  if (isPending) {
    return (
      <div className="flex justify-center py-6">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {googleResults.organic_results.map((result) => (
        <a
          key={result.link}
          href={result.link}
          target="_blank"
          rel="noopener noreferrer">
          <Card className="flex cursor-pointer flex-col gap-1 border-none px-3 py-2 hover:bg-card-focus">
            <div className="flex items-center gap-2">
              <img
                src={result.favicon}
                alt="link icon"
                width={20}
                height={20}
              />
              <span className="text-sm text-muted-foreground">
                {new URL(result.link).origin
                  .replace("https://", "")
                  .replace("http://", "")}
              </span>
            </div>
            <h5 className="font-bold">{result.title}</h5>
            <p className="text-sm text-muted-foreground">{result.snippet}</p>
          </Card>
        </a>
      ))}
    </div>
  )
}
