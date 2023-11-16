import React, { memo, Fragment, useState } from 'react'
import avatar from 'assets/avatarDefault.png'
import { memberSidebar } from 'ultils/contants'
import { NavLink, Link } from 'react-router-dom'
import clsx from 'clsx'
import { AiOutlineCaretDown, AiOutlineCaretRight, AiOutlineHome } from 'react-icons/ai'
import { useSelector } from 'react-redux';

const activedStyle = 'px-4 py-2 flex items-center gap-2  bg-blue-500'
const notActivedStyle = 'px-4 py-2 flex items-center gap-2 hover:bg-blue-200'
const MemberSidebar = () => {
    const [actived, setActived] = useState([])
    const { current } = useSelector(state => state.user)
    const handeShowTabs = (tabID) => {
        if (actived.some(el => el === tabID)) setActived(prev => prev.filter(el => el !== tabID))
        else setActived(prev => [...prev, tabID])
    }
    return (
        <div className=' bg-while h-full py-4 w-[250px] flex-none'>
            <Link className='w-full flex items-center flex-col justify-center py-4'>
                <img src={current?.avatar || avatar} alt="logo" className='w-16 h-16 object-cover' />
                <small>{`${current?.lastname} ${current?.firstname}`}</small>
            </Link>
            <NavLink to={'/'} className={clsx(notActivedStyle)}> <AiOutlineHome size={20} /> Go Home</NavLink>
            <div>
                {memberSidebar?.map(el => (
                    <Fragment key={el.id}>
                        {el.type === 'SINGLE' && <NavLink
                            to={el.path}
                            className={({ isActive }) => clsx(isActive && activedStyle, !isActive && notActivedStyle)}
                        >
                            <span>{el.icon}</span>
                            <span>{el.text}</span>
                        </NavLink>}
                        {el.type === 'PARENT' && <div onClick={() => handeShowTabs(+el.id)} className=' flex-col flex'>
                            <div className='flex items-center justify-between px-4 py-2 hover:bg-blue-300 cursor-pointer'>
                                <div className='flex items-center gap-2'>
                                    <span>{el.icon}</span>
                                    <span>{el.text}</span>
                                </div>
                                {actived.some(id => id === el.id) ? <AiOutlineCaretRight /> : <AiOutlineCaretDown />}
                            </div>
                            {actived.some(id => +id === +el.id) && <div className='flex flex-col'>
                                {el.submenu.map(item => (
                                    <NavLink
                                        key={el.text}
                                        to={item.path}
                                        onClick={e => e.stopPropagation()}
                                        className={({ isActive }) => clsx(isActive && activedStyle, !isActive && notActivedStyle, ' pl-10')}
                                    >
                                        {item.text}
                                    </NavLink>
                                ))}
                            </div>}
                        </div>}
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

export default memo(MemberSidebar)
