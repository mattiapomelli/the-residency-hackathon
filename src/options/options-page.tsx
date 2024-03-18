import { useUser } from "@clerk/chrome-extension"

export function OptionsPage() {
  const { user } = useUser()

  return (
    <div>
      <h1 className="text-4xl font-bold">Hello, {user.firstName}</h1>
    </div>
  )
}
