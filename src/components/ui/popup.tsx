import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
// import { X } from "lucide-react"
import { forwardRef, type RefObject } from "react"

interface PopupProps {
  children: React.ReactNode
  style?: React.CSSProperties
  onClose?: () => void
  className?: string
  onMouseLeave?: () => void
}

export const Popup = forwardRef(
  (
    { children, onMouseLeave, className, ...props }: PopupProps,
    ref: RefObject<HTMLDivElement>
  ) => {
    return (
      <Card
        {...props}
        ref={ref}
        className={cn(
          "max-h-[400px] w-[400px] overflow-y-auto rounded-lg bg-background py-3 text-sm",
          className
        )}
        onMouseLeave={onMouseLeave}>
        {/* <X
          className="absolute top-2 right-2 w-4 h-4 cursor-pointer"
          onClick={onClose}
        /> */}
        {children}
      </Card>
    )
  }
)

Popup.displayName = "Popup"
