function Footer() {
    return (
      <footer className='mt-32 w-full border-t border-borderSoft bg-surface'>
        <div className='mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-4'>
          <div>
            <h2 className='text-3xl font-black text-primary'>
              CampusPulse
            </h2>
  
            <p className='mt-5 leading-relaxed text-softText'>
              The unified academic social network for vibrant campus communities.
            </p>
          </div>
  
          <div>
            <h3 className='mb-5 text-lg font-bold'>Navigation</h3>
  
            <div className='space-y-3 text-softText'>
              <p>Discover</p>
              <p>Organizations</p>
              <p>Campus Map</p>
            </div>
          </div>
  
          <div>
            <h3 className='mb-5 text-lg font-bold'>Support</h3>
  
            <div className='space-y-3 text-softText'>
              <p>Help Center</p>
              <p>Privacy Policy</p>
              <p>Terms</p>
            </div>
          </div>
  
          <div>
            <h3 className='mb-5 text-lg font-bold'>Stay Connected</h3>
  
            <p className='text-softText'>
              Join campus communities and stay updated with events.
            </p>
          </div>
        </div>
      </footer>
    )
  }
  
  export default Footer