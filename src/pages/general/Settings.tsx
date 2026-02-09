import { IoHelpCircleOutline } from 'react-icons/io5'

const Settings = () => {
  return (
    <div className='w-full min-h-[calc(100vh-3rem)] bg-neutral-100'>
      {/* Header */}
      <div className='px-4 md:px-10 py-5 border-b border-neutral-300 bg-white'>
        <h1 className='text-xl md:text-2xl font-semibold text-neutral-900'>
          Settings
        </h1>
      </div>

      {/* Content */}
      <div className='w-full'>
        <ul className='divide-y divide-neutral-200 bg-white  border border-neutral-300 overflow-hidden'>
          {/* Help */}
          <li className='flex items-center gap-3 px-4 py-4 hover:bg-neutral-50 transition'>
            <IoHelpCircleOutline className='h-5 w-5 text-neutral-600' />
            <span className='text-sm font-medium text-neutral-800'>
              Help & Support
            </span>
          </li>

        
        </ul>
      </div>
    </div>
  )
}

export default Settings
