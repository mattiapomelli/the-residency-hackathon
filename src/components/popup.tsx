import { X } from "lucide-react"
import { forwardRef, type RefObject } from "react"

interface PopupProps {
  style: React.CSSProperties
  onClose: () => void
  children: React.ReactNode
}

export const Popup = forwardRef(
  (
    { onClose, children, ...props }: PopupProps,
    ref: RefObject<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        {...props}
        className="bg-gray-200 p-4 py-3 rounded-[0.8rem] w-[400px] text-sm max-h-[400px] overflow-y-auto">
        <X
          className="absolute top-2 right-2 w-4 h-4 cursor-pointer text-black"
          onClick={onClose}
        />
        {children}
      </div>
    )
  }
)
