import { BackButton } from "@/components/back-button"
import { Definition } from "@/components/popups/explore-popup/definition"
import { ImagesList } from "@/components/popups/explore-popup/images-list"
import { LinksList } from "@/components/popups/explore-popup/links-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface InfoCardProps {
  selectedText: string
  onBack?: () => void
}

export function ExplorePopupContent({ selectedText, onBack }: InfoCardProps) {
  return (
    <Tabs
      defaultValue="definition"
      className="flex flex-col justify-between gap-4">
      {onBack && (
        <div className="px-4">
          <BackButton onClick={onBack} />
        </div>
      )}

      <div className="h-[240px] overflow-y-auto px-4">
        <TabsContent value="definition" className="m-0 p-0">
          <Definition selectedText={selectedText} />
        </TabsContent>

        <TabsContent value="links" className="m-0 p-0">
          <LinksList selectedText={selectedText} />
        </TabsContent>

        <TabsContent value="images" className="m-0 p-0">
          <ImagesList selectedText={selectedText} />
        </TabsContent>
      </div>

      <TabsList className="mb-1 grid w-full grid-cols-3 justify-start rounded-none border-t bg-transparent px-4 py-2">
        <TabsTrigger
          value="definition"
          className="rounded-md px-3 py-1.5 text-sm font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:bg-card data-[state=active]:text-foreground">
          Definition
        </TabsTrigger>
        <TabsTrigger
          value="images"
          className="rounded-md bg-transparent px-3 py-1.5 text-sm font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:bg-card data-[state=active]:text-foreground">
          Images
        </TabsTrigger>
        <TabsTrigger
          value="links"
          className="rounded-md px-3 py-1.5 text-sm font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:bg-card data-[state=active]:text-foreground">
          Links
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
