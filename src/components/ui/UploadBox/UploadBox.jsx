import { UploadCloud } from 'lucide-react'

function UploadBox() {
  return (
    <div className='rounded-[28px] border-2 border-dashed border-borderSoft bg-background p-10 text-center transition hover:border-primary'>
      <div className='mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10'>
        <UploadCloud
          size={36}
          className='text-primary'
        />
      </div>

      <h3 className='mt-6 text-2xl font-black text-dark'>
        Upload Event Poster
      </h3>

      <p className='mt-3 text-softText'>
        Drag & drop image here or click to browse.
      </p>

      <button className='mt-6 rounded-2xl bg-primary px-6 py-3 font-semibold text-white'>
        Choose File
      </button>
    </div>
  )
}

export default UploadBox