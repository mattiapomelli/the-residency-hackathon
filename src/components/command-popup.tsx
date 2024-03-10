import { Spinner } from "@/components/ui/spinner"
import type { PopupInfo } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { X } from "lucide-react"

import { sendToBackground } from "@plasmohq/messaging"

interface CommandPopupProps {
  selectedText: string
  style: React.CSSProperties
  onClose: () => void
}

export function CommandPopup({
  selectedText,
  onClose,
  ...props
}: CommandPopupProps) {
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
      {...props}
      className="bg-gray-200 p-3 rounded-lg w-[300px] text-sm max-h-[400px] overflow-y-auto">
      <X
        className="absolute top-2 right-2 w-4 h-4 cursor-pointer text-foreground"
        onClick={onClose}
      />

      {isFetching ? (
        <div className="flex justify-center py-8">
          <Spinner />
        </div>
      ) : (
        <>{data.text}</>
      )}
    </div>
  )
}
