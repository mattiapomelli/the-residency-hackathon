import { Spinner } from "@/components/ui/spinner"
import type { GoogleImageSearchResponse } from "@/lib/serp"
import { useQuery } from "@tanstack/react-query"

import { sendToBackground } from "@plasmohq/messaging"

export function ImagesList({ selectedText }: { selectedText: string }) {
  const { data: imageResults, isPending } = useQuery({
    queryKey: ["images", selectedText],
    queryFn: async () => {
      const res = await sendToBackground({
        name: "google-images",
        body: {
          selectedText,
          pageContent: document.body.innerText
        }
      })

      return res.imageResults as GoogleImageSearchResponse
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
    <div className="grid grid-cols-2 gap-3">
      {imageResults.images_results.slice(0, 6).map((image) => (
        <a
          key={image.original}
          href={image.original}
          target="_blank"
          rel="noreferrer noopener"
          className="relative h-[100px] overflow-hidden rounded-[0.5rem]">
          <img
            src={image.original}
            alt="link icon"
            className="size-full rounded-[0.5rem] object-cover"
          />
        </a>
      ))}
    </div>
  )
}
