function AuthLayout({ children }) {
    return (
      <main className='flex min-h-screen bg-background'>
        {/* LEFT */}
        <section className='hidden flex-1 overflow-hidden bg-heroGradient lg:flex'>
          <div className='flex w-full flex-col justify-between p-14'>
            <div>
              <h1 className='text-5xl font-black text-dark'>
                CampusPulse
              </h1>
  
              <p className='mt-5 max-w-md text-lg leading-relaxed text-softText'>
                The modern campus event ecosystem for students, organizations,
                and communities.
              </p>
            </div>
  
            <div className='rounded-[40px] border border-white/40 bg-white/30 p-8 backdrop-blur-xl'>
              <h2 className='text-3xl font-black leading-snug text-dark'>
                Discover experiences beyond the classroom.
              </h2>
            </div>
          </div>
        </section>
  
        {/* RIGHT */}
        <section className='flex w-full items-center justify-center p-8 lg:w-[520px]'>
          <div className='w-full max-w-md'>
            {children}
          </div>
        </section>
      </main>
    )
  }
  
  export default AuthLayout