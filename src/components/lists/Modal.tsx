import type { ReactNode } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: ReactNode
}

export default function Modal ({ open, onClose, children }: ModalProps) {
  if (!open) return null

  return (
    <div className="fixed  inset-0 z-100 flex items-center justify-center overflow-y-scroll scrollbar-hide">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative w-fit  z-10 max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
