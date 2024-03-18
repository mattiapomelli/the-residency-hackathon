import { Card } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { useHighlightKeywords } from "@/lib/hooks/use-highlight-keywords"
import { formatDate } from "@/lib/utils"
import { CommandsPopup } from "@/reader/commands-popup"
import { Sidebar } from "@/reader/sidebar/sidebar"
import { SidebarView, type Article, type SidebarStatus } from "@/types"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useCompletion } from "ai/react"
import ky from "ky"
import { Sparkle, Volume2, X } from "lucide-react"
import { useEffect, useState } from "react"

interface ReaderPageProps {
  url: string
}

export function ReaderPage({ url }: ReaderPageProps) {
  const [sidebarStatus, setSidebarStatus] = useState<SidebarStatus>({
    show: false,
    selectedText: "",
    view: SidebarView.Search
  })
  const [commandsPopupStatus, setCommandsPopupStatus] = useState({
    show: false,
    top: 0,
    left: 0,
    selectedText: ""
  })

  const { mutate: embed } = useMutation({
    mutationFn: async () => {
      return await ky.post(`${process.env.PLASMO_PUBLIC_API_URL}/embed`, {
        json: {
          url
        }
      })
    }
  })

  useEffect(() => {
    embed()
  }, [embed])

  const { data: article, isFetching } = useQuery({
    queryKey: ["article", url],
    queryFn: async () => {
      return await ky
        .post(`${process.env.PLASMO_PUBLIC_API_URL}/extract`, {
          json: {
            url
          }
        })
        .json<Article>()
    },
    retry: 0,
    staleTime: Infinity
  })

  const onPlay = () => {
    const synth = window.speechSynthesis
    const voices = synth.getVoices()

    const utterance = new SpeechSynthesisUtterance(article?.textContent)
    const voice = voices.find((voice) => voice.name === "Aaron")

    if (!voice) return

    utterance.voice = voice
    utterance.pitch = 1 // Range between 0 and 2
    utterance.rate = 1 // Range between 0.1 and 10
    utterance.volume = 1 // Range between 0 and 1

    synth.speak(utterance)
  }

  // const [showKeywords, setShowKeywords] = useState(false)
  const highlightKeywords = useHighlightKeywords({
    rootElement: document.body
  })

  const { complete } = useCompletion({
    api: `${process.env.PLASMO_PUBLIC_API_URL}/completion/keywords`,
    body: {
      text: article?.textContent
    },
    onFinish(_, completion) {
      const keywords = completion.split(", ")
      highlightKeywords(keywords)
    }
  })

  useEffect(() => {
    const onMouseUp = (event: MouseEvent) => {
      if (commandsPopupStatus.show) return

      const selection = window.getSelection()
      const selectedText = selection.toString()

      if (selectedText.length > 0) {
        // Get the position of the end of selected text
        // const range = selection.getRangeAt(0)
        // const rect = range.getBoundingClientRect()

        setCommandsPopupStatus({
          show: true,
          top: event.clientY + 10,
          left: event.clientX + 10,
          // top: rect.top + window.scrollY + rect.height,
          // left: rect.left + window.scrollX + rect.width,
          selectedText
        })
      }
    }

    document.addEventListener("mouseup", onMouseUp)

    return () => {
      document.removeEventListener("mouseup", onMouseUp)
    }
  }, [commandsPopupStatus.show])

  const onLoadKeywords = () => {
    complete("")
  }

  // console.log("keywords: ", keywords)

  if (isFetching || !article) {
    return (
      <div className="flex justify-center py-4">
        <Spinner />
      </div>
    )
  }

  return (
    <>
      <Card className="fixed left-6 top-6 rounded-xl bg-background p-2">
        <button className="flex items-center justify-center rounded-md p-3 hover:bg-card">
          <X />
        </button>
        <button
          onClick={onPlay}
          className="flex items-center justify-center rounded-md p-3 hover:bg-card">
          <Volume2 />
        </button>
        <button
          onClick={onLoadKeywords}
          className="flex items-center justify-center rounded-md p-3 hover:bg-card">
          <Sparkle />
        </button>
      </Card>

      <div className="flex w-full">
        <div className="h-screen flex-1 overflow-auto px-4 py-20">
          <div className="mx-auto max-w-2xl">
            {/* <button onClick={onClick}>Listen</button> */}
            <h1 className="mb-4 text-4xl font-bold">{article.title}</h1>
            <p className="mb-6 text-sm text-muted-foreground">
              {article.byline && `${article.byline} - `}
              {article.publishedTime &&
                `${formatDate(article.publishedTime)} - `}
              {article.readingTime}
            </p>

            <div
              className="prose mx-auto max-w-2xl"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </div>

        {sidebarStatus.show && (
          <Sidebar
            article={article}
            view={sidebarStatus.view}
            selectedText={sidebarStatus.selectedText}
            language={sidebarStatus.language}
          />
        )}
      </div>

      {commandsPopupStatus.show && (
        <CommandsPopup
          setSidebarStatus={setSidebarStatus}
          style={{
            position: "absolute",
            top: commandsPopupStatus.top,
            left: commandsPopupStatus.left
          }}
          selectedText={commandsPopupStatus.selectedText}
          onClose={() =>
            setCommandsPopupStatus({ ...commandsPopupStatus, show: false })
          }
        />
      )}
    </>
  )
}
