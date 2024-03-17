import { BackButton } from "@/components/back-button"
import { Spinner } from "@/components/ui/spinner"
import { useQuery } from "@tanstack/react-query"
import ky from "ky"
import { useEffect, useState } from "react"

// import { sendToBackground } from "@plasmohq/messaging"

interface ListenPopupContentProps {
  selectedText: string
  onBack: () => void
}

export function ListenPopupContent({
  selectedText,
  onBack
}: ListenPopupContentProps) {
  console.log("Listen")
  const [audioUrl, setAudioUrl] = useState("")

  const { data: response, isFetching } = useQuery({
    queryKey: ["audio", selectedText],
    queryFn: async () => {
      const response = await ky
        .post(
          `https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM`,
          {
            json: {
              text: selectedText
            },
            headers: {
              "Content-Type": "application/json",
              "xi-api-key": process.env.PLASMO_PUBLIC_ELEVENLABS_API_KEY
            }
          }
        )
        .blob()

      // return URL.createObjectURL(response)

      return response
    },
    staleTime: Infinity
  })

  console.log("Response: ", response)

  useEffect(() => {
    if (!response) return

    const reader = new FileReader()

    reader.onload = function (e) {
      const dataUrl = e.target?.result
      console.log("Data url: ", dataUrl) // This is your audio file as a Data URL

      setAudioUrl(dataUrl as string)

      // You can now set this URL as the src for an audio element, for example:
      // document.getElementById('yourAudioElement').src = dataUrl;
    }

    reader.readAsDataURL(response)
  }, [response])

  // console.log(audio)

  return (
    <div className="flex flex-col gap-4 px-4">
      <div>
        <BackButton onClick={onBack} />
      </div>
      {isFetching ? (
        <div className="flex justify-center py-4">
          <Spinner />
        </div>
      ) : (
        <p>{audioUrl && <audio src={audioUrl} controls></audio>}</p>
      )}
    </div>
  )
}
