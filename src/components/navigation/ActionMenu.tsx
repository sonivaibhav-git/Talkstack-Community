import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import {
 
  IoPeopleOutline,
  IoFolderOutline,
  IoPinOutline,
  IoArchiveOutline,
  IoFlagOutline,
  IoTrashOutline,
  IoShareSocial
} from 'react-icons/io5'

type ActionMenuProps = {
  open: boolean
  onClose: () => void
}

export default function ActionMenu ({ open, onClose }: ActionMenuProps) {
  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div className='fixed inset-0 z-40' onClick={onClose} />

      <div
        className='
          absolute right-0 top-10 z-50 mt-2 w-64
          rounded-xl bg-neutral-800 shadow-2xl py-2
        '
      >
        <MenuLink to='/share' icon={<IoShareSocial />} label='Share' />
        {/* <MenuLink
          to='/group'
          icon={<IoPeopleOutline />}
          label='Start a group chat'
        /> */}
        {/* <MenuLink
          to='/move'
          icon={<IoFolderOutline />}
          label='Move to project'
        /> */}
        <MenuButton icon={<IoArchiveOutline />} label='Archive' />

        <MenuLink to='/block' icon={<IoFlagOutline />} label='Block' />

        <MenuButton icon={<IoTrashOutline />} label='Delete' danger />
      </div>
    </>
  )
}

/* ---------- Item Components (same role as NavItem) ---------- */

type ItemProps = {
  icon: ReactNode
  label: string
  danger?: boolean
}

function MenuLink ({ to, icon, label, danger }: ItemProps & { to: string }) {
  return (
    <Link to={to} className={itemClass(danger)}>
      <span className='text-lg'>{icon}</span>
      <span className='text-sm'>{label}</span>
    </Link>
  )
}

function MenuButton ({ icon, label, danger }: ItemProps) {
  return (
    <button className={itemClass(danger)} onClick={() => console.log(label)}>
      <span className='text-lg'>{icon}</span>
      <span className='text-sm'>{label}</span>
    </button>
  )
}

function itemClass (danger?: boolean) {
  return `
    flex w-full items-center gap-3 px-4 py-2 rounded-lg
    text-left transition
    ${
      danger
        ? 'text-red-400 hover:bg-red-900/30'
        : 'text-neutral-200 hover:bg-neutral-700'
    }
  `
}
