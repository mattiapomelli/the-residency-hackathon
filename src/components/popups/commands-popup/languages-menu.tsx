import { BackButton } from "@/components/back-button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const languages = [
  {
    name: "Arabic",
    icon: "https://cdn.countryflags.com/thumbs/saudi-arabia/flag-square-500.png"
  },
  {
    name: "Bengali",
    icon: "https://cdn.countryflags.com/thumbs/bangladesh/flag-square-500.png"
  },
  {
    name: "Bulgarian",
    icon: "https://cdn.countryflags.com/thumbs/bulgaria/flag-square-500.png"
  },
  {
    name: "Chinese (Mandarin)",
    icon: "https://cdn.countryflags.com/thumbs/china/flag-square-500.png"
  },
  {
    name: "Czech",
    icon: "https://cdn.countryflags.com/thumbs/czech-republic/flag-square-500.png"
  },
  {
    name: "Danish",
    icon: "https://cdn.countryflags.com/thumbs/denmark/flag-square-500.png"
  },
  {
    name: "Dutch",
    icon: "https://cdn.countryflags.com/thumbs/netherlands/flag-square-500.png"
  },
  {
    name: "English",
    icon: "https://cdn.countryflags.com/thumbs/united-states-of-america/flag-square-500.png"
  },
  {
    name: "Finnish",
    icon: "https://cdn.countryflags.com/thumbs/finland/flag-square-500.png"
  },
  {
    name: "French",
    icon: "https://cdn.countryflags.com/thumbs/france/flag-square-500.png"
  },
  {
    name: "German",
    icon: "https://cdn.countryflags.com/thumbs/germany/flag-square-500.png"
  },
  {
    name: "Greek",
    icon: "https://cdn.countryflags.com/thumbs/greece/flag-square-500.png"
  },
  {
    name: "Hebrew",
    icon: "https://cdn.countryflags.com/thumbs/israel/flag-square-500.png"
  },
  {
    name: "Hindi",
    icon: "https://cdn.countryflags.com/thumbs/india/flag-square-500.png"
  },
  {
    name: "Hungarian",
    icon: "https://cdn.countryflags.com/thumbs/hungary/flag-square-500.png"
  },
  {
    name: "Indonesian",
    icon: "https://cdn.countryflags.com/thumbs/indonesia/flag-square-500.png"
  },
  {
    name: "Italian",
    icon: "https://cdn.countryflags.com/thumbs/italy/flag-square-500.png"
  },
  {
    name: "Japanese",
    icon: "https://cdn.countryflags.com/thumbs/japan/flag-square-500.png"
  },
  {
    name: "Korean",
    icon: "https://cdn.countryflags.com/thumbs/south-korea/flag-square-500.png"
  },
  {
    name: "Latvian",
    icon: "https://cdn.countryflags.com/thumbs/latvia/flag-square-500.png"
  },
  {
    name: "Lithuanian",
    icon: "https://cdn.countryflags.com/thumbs/lithuania/flag-square-500.png"
  },
  {
    name: "Marathi",
    icon: "https://cdn.countryflags.com/thumbs/india/flag-square-500.png"
  },
  {
    name: "Norwegian",
    icon: "https://cdn.countryflags.com/thumbs/norway/flag-square-500.png"
  },
  {
    name: "Persian",
    icon: "https://cdn.countryflags.com/thumbs/iran/flag-square-500.png"
  },
  {
    name: "Polish",
    icon: "https://cdn.countryflags.com/thumbs/poland/flag-square-500.png"
  },
  {
    name: "Portuguese",
    icon: "https://cdn.countryflags.com/thumbs/portugal/flag-square-500.png"
  },
  {
    name: "Romanian",
    icon: "https://cdn.countryflags.com/thumbs/romania/flag-square-500.png"
  },
  {
    name: "Russian",
    icon: "https://cdn.countryflags.com/thumbs/russia/flag-square-500.png"
  },
  {
    name: "Serbian",
    icon: "https://cdn.countryflags.com/thumbs/serbia/flag-square-500.png"
  },
  {
    name: "Slovak",
    icon: "https://cdn.countryflags.com/thumbs/slovakia/flag-square-500.png"
  },
  {
    name: "Spanish",
    icon: "https://cdn.countryflags.com/thumbs/spain/flag-square-500.png"
  },
  {
    name: "Swahili",
    icon: "https://cdn.countryflags.com/thumbs/kenya/flag-square-500.png"
  },
  {
    name: "Swedish",
    icon: "https://cdn.countryflags.com/thumbs/sweden/flag-square-500.png"
  },
  {
    name: "Tamil",
    icon: "https://cdn.countryflags.com/thumbs/india/flag-square-500.png"
  },
  {
    name: "Telugu",
    icon: "https://cdn.countryflags.com/thumbs/india/flag-square-500.png"
  },
  {
    name: "Thai",
    icon: "https://cdn.countryflags.com/thumbs/thailand/flag-square-500.png"
  },
  {
    name: "Turkish",
    icon: "https://cdn.countryflags.com/thumbs/turkey/flag-square-500.png"
  },
  {
    name: "Ukrainian",
    icon: "https://cdn.countryflags.com/thumbs/ukraine/flag-square-500.png"
  },
  {
    name: "Urdu",
    icon: "https://cdn.countryflags.com/thumbs/pakistan/flag-square-500.png"
  },
  {
    name: "Vietnamese",
    icon: "https://cdn.countryflags.com/thumbs/vietnam/flag-square-500.png"
  }
]
interface LanguagesMenuProps {
  onBack: () => void
  onSelect: (language: string) => void
}

export function LanguagesMenu({ onBack, onSelect }: LanguagesMenuProps) {
  const [search, setSearch] = useState("")

  const filterdLanguages = languages.filter((language) =>
    language.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <BackButton onClick={onBack} />
        <h4 className="font-semibold">Translate to</h4>
      </div>
      <Input
        id="language"
        placeholder="Search..."
        value={search}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => setSearch(e.target.value)}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect="off"
      />
      <div className="mt-2 flex h-[200px] flex-col gap-2 overflow-hidden overflow-y-auto">
        {filterdLanguages.map((language) => (
          <button
            key={language.name}
            onClick={() => onSelect(language.name)}
            className="flex items-center gap-3 rounded-[0.6rem] px-3 py-1.5 hover:bg-card">
            <img
              src={language.icon}
              alt={`${language.name} Flag`}
              width={20}
              height={20}
              className="rounded-md"
            />
            {language.name}
          </button>
        ))}
      </div>
    </div>
  )
}
