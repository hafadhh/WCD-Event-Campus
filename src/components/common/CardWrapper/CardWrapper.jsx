function CardWrapper({ children }) {
    return (
      <div className='rounded-[32px] border border-borderSoft bg-white p-8 shadow-card'>
        {children}
      </div>
    )
  }
  
  export default CardWrapper