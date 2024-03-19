import { Instructions } from "@/components/instructions"
import { UpgradePlan } from "@/components/upgrade-plan"
import { useUser } from "@clerk/chrome-extension"

export function PopupPage() {
  const { user } = useUser()

  const needsToPay = user.publicMetadata.plan === "none"

  return (
    <>
      <h1 className="mb-2 text-2xl font-bold">Hello, {user.firstName}!</h1>
      {needsToPay && <UpgradePlan />}
      <Instructions />
    </>
  )

  // return (
  //   <Tabs
  //     defaultValue="instructions"
  //     className="flex min-h-[300px] w-[400px] flex-col justify-between gap-4 py-4">
  //     <div className="px-4">
  //       {user.publicMetadata.plan === "none" && (
  //         <div className="mb-4 flex items-center gap-3 rounded-md bg-yellow-200 px-4 py-2 text-base">
  //           <CircleAlert className="size-5" />
  //           Upgrade to keep using RabbitHole.
  //         </div>
  //       )}

  //       <TabsContent value="instructions" className="m-0 p-0">
  //         <Instructions />
  //       </TabsContent>
  //       {/*
  //       <TabsContent value="summary" className="m-0 p-0">
  //         Summary
  //       </TabsContent> */}
  //     </div>

  //     <TabsList className="mb-1 grid w-full grid-cols-2 justify-start rounded-none border-t bg-transparent px-4 py-2">
  //       <TabsTrigger
  //         value="instructions"
  //         className="rounded-md px-3 py-1.5 text-sm font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:bg-card data-[state=active]:text-foreground">
  //         Instructions
  //       </TabsTrigger>
  //       <TabsTrigger
  //         value="summary"
  //         className="rounded-md bg-transparent px-3 py-1.5 text-sm font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:bg-card data-[state=active]:text-foreground">
  //         Summary
  //       </TabsTrigger>
  //       <TabsTrigger
  //         value="audio"
  //         className="rounded-md px-3 py-1.5 text-sm font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:bg-card data-[state=active]:text-foreground">
  //         Audio
  //       </TabsTrigger>
  //     </TabsList>
  //   </Tabs>
  // )
}
