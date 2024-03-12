import { Spinner } from "@/components/ui/spinner"
import { useQuery } from "@tanstack/react-query"

import { sendToBackground } from "@plasmohq/messaging"

export function Definition({ selectedText }: { selectedText: string }) {
  const { data: explanation, isPending } = useQuery({
    queryKey: ["definition", selectedText],
    queryFn: async () => {
      const res = await sendToBackground({
        name: "definition",
        body: {
          selectedText,
          pageContent: document.body.innerText
        }
      })

      return res
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

  // Highlight in bold the selected text in the explanation
  const html = explanation?.replace(
    new RegExp(selectedText, "gi"),
    `<span class="font-bold">${selectedText}</span>`
  )

  return <p dangerouslySetInnerHTML={{ __html: html }} />
}
