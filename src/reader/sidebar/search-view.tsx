import { Spinner } from "@/components/ui/spinner"
import type { Article } from "@/types"
import { useQuery } from "@tanstack/react-query"
import ky from "ky"

interface SearchResult {
  description: string
  images: string[]
  type?: string
}

interface SearchViewProps {
  article: Article
  query: string
}

export function SearchView({ query, article }: SearchViewProps) {
  const { data: searchResult, isFetching } = useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      return ky
        .post(`${process.env.PLASMO_PUBLIC_API_URL}/search`, {
          json: {
            query,
            articleTitle: article.title
          }
        })
        .json<SearchResult>()
    },
    enabled: !!query,
    staleTime: Infinity,
    retry: 0
  })

  if (isFetching) {
    return (
      <div className="flex justify-center py-4">
        <Spinner />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-3">
        <h1 className="mb-2 text-xl font-bold">{query}</h1>
        <div className="text-sm">{searchResult.type}</div>
      </div>

      <div className="prose">
        <p>{searchResult.description}</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {searchResult.images?.map((image) => (
          <a
            key={image}
            href={image}
            target="_blank"
            rel="noreferrer noopener"
            className="relative h-[100px] overflow-hidden rounded-[0.5rem]">
            <img
              src={image}
              alt="link icon"
              className="size-full rounded-[0.5rem] object-cover"
            />
          </a>
        ))}
      </div>
    </div>
  )
}
