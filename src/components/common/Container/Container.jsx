
function Container({ children, className = '' }) {
  return (
    <div
      className={`mx-auto w-full max-w-[1480px] px-8 lg:px-12 ${className}`}
    >
      {children}
    </div>
  )
}

export default Container

// function Container({ children }) {
//     return (
//       <div className='mx-auto w-full max-w-7xl px-6'>
//         {children}
//       </div>
//     )
//   }
  
//   export default Container