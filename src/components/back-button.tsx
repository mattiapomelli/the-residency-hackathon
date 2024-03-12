import { cn } from "@/lib/utils"
import { ChevronLeft } from "lucide-react"

interface BackButtonProps {
  onClick: () => void
  className?: string
}

export function BackButton({ onClick, className }: BackButtonProps) {
  return (
    <button
      className={cn("rounded-lg bg-card px-3 py-2", className)}
      onClick={onClick}>
      <ChevronLeft className="size-4" />
    </button>
  )
}
