import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Audio } from "@/popup/audio"
import { Instructions } from "@/popup/instructions"

export function PopupPage() {
  return (
    <Tabs
      defaultValue="instructions"
      className="flex w-[400px] flex-col justify-between gap-4 py-4">
      <div className="h-[300px] overflow-y-auto px-4">
        <TabsContent value="instructions" className="m-0 p-0">
          <Instructions />
        </TabsContent>

        <TabsContent value="summary" className="m-0 p-0">
          Summary
        </TabsContent>

        <TabsContent value="audio" className="m-0 p-0">
          <Audio />
        </TabsContent>
      </div>

      <TabsList className="mb-1 grid w-full grid-cols-3 justify-start rounded-none border-t bg-transparent px-4 py-2">
        <TabsTrigger
          value="instructions"
          className="rounded-md px-3 py-1.5 text-sm font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:bg-card data-[state=active]:text-foreground">
          Instructions
        </TabsTrigger>
        <TabsTrigger
          value="summary"
          className="rounded-md bg-transparent px-3 py-1.5 text-sm font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:bg-card data-[state=active]:text-foreground">
          Summary
        </TabsTrigger>
        <TabsTrigger
          value="audio"
          className="rounded-md px-3 py-1.5 text-sm font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:bg-card data-[state=active]:text-foreground">
          Audio
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
