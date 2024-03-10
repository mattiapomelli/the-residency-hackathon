import { Spinner } from "@/components/ui/spinner"
import type { GoogleSearchResponse } from "@/lib/serp"
import type { PopupInfo } from "@/types"
import { useQuery } from "@tanstack/react-query"

import { sendToBackground } from "@plasmohq/messaging"

interface InfoCardProps {
  selectedText: string
}

export function InfoCard({ selectedText }: InfoCardProps) {
  const { data: explanation, isFetching: isFetchingExplanation } = useQuery({
    queryKey: ["info", selectedText],
    queryFn: async () => {
      const res = await sendToBackground({
        name: "info",
        body: {
          selectedText,
          pageContent: document.body.innerText
        }
      })

      return res
    }
  })

  const { data: googleResults, isFetching: isFetchingGoogleResults } = useQuery(
    {
      queryKey: ["google-results", selectedText],
      queryFn: async () => {
        const res = await sendToBackground({
          name: "google-results",
          body: {
            selectedText,
            pageContent: document.body.innerText
          }
        })

        return res.googleResults as GoogleSearchResponse
      }
    }
  )

  // if (isFetching) {
  //   return (
  //     <div className="flex justify-center py-14">
  //       <Spinner />
  //     </div>
  //   )
  // }

  return (
    <div className="flex gap-4 flex-col">
      <div>
        <h4 className="font-bold text-lg mb-2">Definition</h4>
        {isFetchingExplanation ? (
          <div className="flex justify-center py-4">
            <Spinner />
          </div>
        ) : (
          <p className="text-muted-foreground">{explanation}</p>
        )}
      </div>
      <div>
        <h4 className="font-bold text-lg mb-2">Links</h4>
        {isFetchingGoogleResults ? (
          <div className="flex justify-center py-4">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {googleResults.organic_results.map((result, i) => (
              <div key={result.link} className="flex gap-2 items-center">
                <img
                  src={result.favicon}
                  alt="link icon"
                  width={20}
                  height={20}
                />
                <a
                  href={result.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline">
                  {result.title}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
      {googleResults?.inline_images?.length > 0 && (
        <div>
          <h4 className="font-bold text-lg mb-2">Images</h4>
          <div className="grid grid-cols-2 gap-3">
            {googleResults.inline_images.map((image, i) => (
              <div className="h-[100px] relative overflow-hidden rounded-md">
                <img
                  src={image.original}
                  alt="link icon"
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
