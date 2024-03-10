import { Spinner } from "@/components/ui/spinner"
import type { PopupInfo } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { X } from "lucide-react"
import { forwardRef, type RefObject } from "react"

import { sendToBackground } from "@plasmohq/messaging"

interface CommandPopupProps {
  selectedText: string
  style: React.CSSProperties
  onClose: () => void
}

export const CommandPopup = forwardRef(
  (
    { selectedText, onClose, ...props }: CommandPopupProps,
    ref: RefObject<HTMLDivElement>
  ) => {
    const { data, isFetching } = useQuery({
      queryKey: ["info", selectedText],
      queryFn: async () => {
        const res = await sendToBackground({
          name: "info",
          body: {
            selectedText,
            pageContent: document.body.innerText
          }
        })

        return res as PopupInfo
      }
    })

    return (
      <div
        ref={ref}
        {...props}
        className="bg-gray-200 p-4 py-3 rounded-lg w-[400px] text-sm max-h-[400px] overflow-y-auto">
        <X
          className="absolute top-2 right-2 w-4 h-4 cursor-pointer text-foreground"
          onClick={onClose}
        />

        {isFetching ? (
          <div className="flex justify-center py-8">
            <Spinner />
          </div>
        ) : (
          <div className="flex gap-4 flex-col">
            <div>
              <h4 className="font-bold text-lg mb-2">Explanation</h4>
              <p className="text-muted-foreground">{data.explanation}</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">Links</h4>
              <div className="flex flex-col gap-2">
                {data.googleResults.organic_results.map((result, i) => (
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
            </div>
            {data.googleResults.inline_images?.length > 0 && (
              <div>
                <h4 className="font-bold text-lg mb-2">Images</h4>
                <div className="grid grid-cols-2 gap-3">
                  {data.googleResults.inline_images.map((image, i) => (
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
        )}
      </div>
    )
  }
)
