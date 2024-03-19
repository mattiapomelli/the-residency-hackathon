import { UpgradePlan } from "@/components/upgrade-plan"
import { Instructions } from "@/popup/instructions"
import { useUser } from "@clerk/chrome-extension"

export function OptionsPage() {
  const { user } = useUser()

  const needsToPay = user.publicMetadata.plan === "none"

  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold">Hello, {user.firstName}!</h1>

      {needsToPay && <UpgradePlan />}

      <Instructions />
    </div>
  )
}
