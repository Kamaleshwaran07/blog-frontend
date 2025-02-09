import React from 'react'
import Logo from "../assets/ShowmanLogo1.png"

const Footer = () => {
  return (
   <footer className='mt-[100px] p-5 bg-[#b6e9e9] flex items-center justify-between text-sm'>
    <img src={Logo} alt='' className='w-14' />
   <span>Stories that inspire, insights that matter</span>
   </footer>
  )
}

export default Footer