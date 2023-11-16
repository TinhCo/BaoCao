import React, { Fragment, memo, useEffect, useState } from 'react'
import logo from 'assets/logo.png'
import icons from 'ultils/icons'
import { Link } from 'react-router-dom'
import path from 'ultils/path';
import { useSelector } from 'react-redux';
import { logout } from 'store/user/userSlice';
import withBaseComponent from 'hocs/withBaseComponent';
import { showCart } from 'store/app/appSlice';


const { RiPhoneFill, MdEmail, BsHandbagFill, FaUserCircle } = icons
const Header = ({ dispatch }) => {
  const { current } = useSelector(state => state.user)
  const [isShowOption, setIsShowOption] = useState(false)
  useEffect(() => {
    const handleClinkoutOptions = (e) => {
      const profile = document.getElementById('profile')
      if (!profile?.contains(e.target)) setIsShowOption(false)
    }
    document.addEventListener('click', handleClinkoutOptions);
    return () => {
      document.removeEventListener('click', handleClinkoutOptions)
    }
  }, [])
  return (
    <div className='w-main flex justify-between h-[110px] py-[35px]'>
      <Link to={`/${path.HOME}`}>
        <img src={logo} alt="logo" className='w-[236px] object-contain' />
      </Link>
      <div className='flex text-[13px]'>
        <div className='flex flex-col px-6 border-r items-center'>
          <span className='flex gap-6 items-center'>
            <RiPhoneFill color='red' />
            <span className='font-semibold'> (+84)037.5582.856 </span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>

        <div className='flex flex-col items-center px-6 border-r'>
          <span className='flex gap-6 items-center'>
            <MdEmail color='red' />
            <span className='font-semibold'>  SUPPORT@TìnhCờ</span>
          </span>
          <span>Online Support 24/7</span>
        </div>
        {current && <Fragment>
          <div onClick={() => dispatch(showCart())} className=' cursor-pointer flex items-center justify-center gap-2 px-6 border-r'>
            <BsHandbagFill color='red' />
            <span>{`${current?.cart.length || 0} item(s)`} </span>
          </div>
          <div className='cursor-pointer flex items-center justify-center gap-2 px-6 border-r relative '
            onClick={() => setIsShowOption(prev => !prev)}
            id='profile'>
            <FaUserCircle color='red' />
            <span>Profile</span>
            {isShowOption && (
              <div onClick={e => e.stopPropagation()} className='absolute top-full flex-col flex left-[16px] bg-gray-100 border min-w-[150px] py-2 z-10'>
                <Link className='p-2 w-full hover:bg-sky-100' to={`/${path.MEMBER}/${path.PERSONAL}`}>
                  Personal
                </Link>
                {+current.role === 1945 && (
                  <Link className='p-2 w-full hover:bg-sky-100' to={`/${path.ADMIN}/${path.DASHBOARD}`}>
                    Admin workspace
                  </Link>
                )}
                <span onClick={() => dispatch(logout())} className='p-2 w-full hover:bg-sky-100'>Logout</span>
              </div>
            )}
          </div>

        </Fragment>}
      </div>
    </div>
  )
}

export default withBaseComponent(memo(Header))
