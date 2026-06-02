function Modal({
    isOpen,
    onClose,
    title,
    children
  }) {
    if (!isOpen) return null
  
    return (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6 backdrop-blur-sm'>
        <div className='w-full max-w-2xl rounded-[36px] bg-white p-8 shadow-soft'>
          
          {/* HEADER */}
          <div className='flex items-center justify-between'>
            <h2 className='text-3xl font-black text-dark'>
              {title}
            </h2>
  
            <button
              onClick={onClose}
              className='flex h-12 w-12 items-center justify-center rounded-2xl border border-borderSoft'
            >
              ✕
            </button>
          </div>
  
          {/* CONTENT */}
          <div className='mt-8'>
            {children}
          </div>
        </div>
      </div>
    )
  }
  
  export default Modal