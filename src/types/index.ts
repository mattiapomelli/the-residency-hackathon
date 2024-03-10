import type { GoogleSearchResponse, GoogleSearchResult } from "@/lib/serp"

export interface PopupInfo {
  explanation: string
  googleResults: GoogleSearchResponse
}
