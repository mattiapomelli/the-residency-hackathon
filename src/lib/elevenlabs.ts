import ky from "ky"

const VOICE_ID = "21m00Tcm4TlvDq8ikWAM"

interface AudioOptions {
  text: string
}

export async function getAudio({ text }: AudioOptions) {
  return await ky
    .post(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/stream`, {
      json: {
        text
      },
      timeout: 60000,
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": process.env.PLASMO_PUBLIC_ELEVENLABS_API_KEY
      }
    })
    .blob()
}
