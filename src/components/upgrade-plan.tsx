import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import ky from "ky"
import { Info } from "lucide-react"

export function UpgradePlan() {
  const { mutate: pay, isPending } = useMutation({
    mutationFn: async () => {
      const { url } = await ky
        .get(`${process.env.PLASMO_PUBLIC_API_URL}/pay`)
        .json<{ url: string }>()
      window.open(url, "_blank")
    }
  })

  return (
    <div className="mb-5 flex items-center gap-3 rounded-md bg-yellow-200 p-4">
      <Info className="size-5" />
      <p className="text-sm text-foreground">
        Upgrade to keep using RabbitHole.
      </p>
      <Button
        disabled={isPending}
        loading={isPending}
        className="ml-auto"
        variant="accent"
        onClick={() => pay()}>
        Upgrade to Pro
      </Button>
    </div>
  )
}
