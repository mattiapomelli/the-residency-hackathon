import { Spinner } from "@/components/ui/spinner"
import { getAudio } from "@/lib/elevenlabs"
import type { ArticleInfo } from "@/types"
import { useQuery } from "@tanstack/react-query"

import { sendToContentScript } from "@plasmohq/messaging"

export function Audio() {
  const { data: audioUrl, isFetching } = useQuery({
    queryKey: ["audio"],
    queryFn: async () => {
      const articleInfo = (await sendToContentScript({
        name: "get-article-info"
      })) as ArticleInfo

      const audio = await getAudio({
        text: `${articleInfo.title}. ${articleInfo.textContent}`
      })

      console.log("Audio: ", audio)

      return URL.createObjectURL(audio)
    },
    staleTime: Infinity
  })

  return (
    <>
      <h3 className="mb-3 text-lg font-bold">Audio</h3>

      {isFetching || !audioUrl ? (
        <div className="flex justify-center py-4">
          <Spinner />
        </div>
      ) : (
        <div>
          {audioUrl && (
            <audio src={audioUrl} controls className="w-full"></audio>
          )}
        </div>
      )}
    </>
  )
}
