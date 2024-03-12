import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
// import { X } from "lucide-react"
import { forwardRef, useEffect, type RefObject } from "react"

interface PopupProps {
  children: React.ReactNode
  style?: React.CSSProperties
  onClose?: () => void
  className?: string
  onMouseLeave?: () => void
}

export const Popup = forwardRef(
  (
    { children, onMouseLeave, onClose, className, ...props }: PopupProps,
    ref: RefObject<HTMLDivElement>
  ) => {
    useEffect(() => {
      const onMouseUp = (event: MouseEvent) => {
        // @ts-ignore
        const isOutside = event.target.tagName !== "PLASMO-CSUI"

        if (isOutside) {
          onClose?.()
        }
      }

      document.addEventListener("mouseup", onMouseUp)

      return () => {
        document.removeEventListener("mouseup", onMouseUp)
      }
    }, [onClose])

    return (
      <Card
        {...props}
        ref={ref}
        className={cn(
          "max-h-[400px] w-[400px] overflow-y-auto rounded-xl bg-background py-3 text-sm",
          className
        )}
        onMouseLeave={onMouseLeave}>
        {children}
      </Card>
    )
  }
)

Popup.displayName = "Popup"
