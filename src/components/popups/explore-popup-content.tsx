import { BackButton } from "@/components/back-button"
import { Card } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type {
  GoogleImageSearchResponse,
  GoogleSearchResponse
} from "@/lib/serp"
import { useQuery } from "@tanstack/react-query"

import { sendToBackground } from "@plasmohq/messaging"

interface InfoCardProps {
  selectedText: string
  onBack?: () => void
}

export function ExplorePopupContent({ selectedText, onBack }: InfoCardProps) {
  const { data: explanation, isPending: isExplanationPending } = useQuery({
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
    },
    staleTime: Infinity
  })

  // Highlight in bold the selected text in the explanation
  const html = explanation?.replace(
    new RegExp(selectedText, "gi"),
    `<span class="font-black">${selectedText}</span>`
  )

  const { data: googleResults, isPending: isGoogleResultsPending } = useQuery({
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
    },
    staleTime: Infinity
  })

  const { data: imageResults, isPending: isImagesPending } = useQuery({
    queryKey: ["image-results", selectedText],
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

  return (
    <Tabs
      defaultValue="definition"
      className="flex flex-col justify-between gap-4">
      {onBack && (
        <div className="px-4">
          <BackButton onClick={onBack} />
        </div>
      )}

      <div className="h-[240px] overflow-y-auto px-4">
        <TabsContent value="definition" className="m-0 p-0">
          {isExplanationPending ? (
            <div className="flex justify-center py-6">
              <Spinner />
            </div>
          ) : (
            <p dangerouslySetInnerHTML={{ __html: html }} />
          )}
        </TabsContent>

        <TabsContent value="links" className="m-0 p-0">
          {isGoogleResultsPending ? (
            <div className="flex justify-center py-4">
              <Spinner />
            </div>
          ) : (
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
                    <h5 className="font-black">{result.title}</h5>
                    <p className="text-sm text-muted-foreground">
                      {result.snippet}
                    </p>
                  </Card>
                </a>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="images" className="m-0 p-0">
          {isImagesPending ? (
            <div className="flex justify-center py-6">
              <Spinner />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {imageResults.images_results.slice(0, 6).map((image) => (
                <div
                  key={image.original}
                  className="relative h-[100px] overflow-hidden rounded-[0.5rem]">
                  <img
                    src={image.original}
                    alt="link icon"
                    className="size-full rounded-[0.5rem] object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </div>

      <TabsList className="mb-4 grid w-full grid-cols-3 justify-start rounded-none border-t bg-transparent px-4 py-2">
        <TabsTrigger
          value="definition"
          className="rounded-md px-3 py-1.5 text-sm font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:bg-card data-[state=active]:text-foreground">
          Definition
        </TabsTrigger>
        <TabsTrigger
          value="images"
          className="rounded-md bg-transparent px-3 py-1.5 text-sm font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:bg-card data-[state=active]:text-foreground">
          Images
        </TabsTrigger>
        <TabsTrigger
          value="links"
          className="rounded-md px-3 py-1.5 text-sm font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:bg-card data-[state=active]:text-foreground">
          Links
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
