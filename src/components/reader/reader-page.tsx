import { Reader } from "@/components/reader/reader"
import { UpgradePlan } from "@/components/upgrade-plan"
import { useUser } from "@clerk/chrome-extension"

export function ReaderPage({ url }: { url: string }) {
  const { user } = useUser()

  const needsToPay = user.publicMetadata.plan === "none"

  if (needsToPay) {
    return <UpgradePlan />
  }

  return <Reader url={url} />
}
