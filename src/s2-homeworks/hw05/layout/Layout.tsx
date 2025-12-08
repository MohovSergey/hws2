import React, { FC, ReactNode, useEffect, useState } from 'react'
import { Header } from '../header/Header'
import { Sidebar } from '../sidebar/Sidebar'
import s from '../header/Header.module.css'

type PropsType = {
    children: ReactNode
}

export const Layout: FC<PropsType> = ({ children }) => {
    const [open, setOpen] = useState(false)
    const handleClose = () => setOpen(false)
    const handleOpen = () => setOpen(prev => !prev)

    useEffect(() => {
        open && (document.body.style.overflow = 'hidden')
        !open && (document.body.style.overflow = 'unset')
    }, [open]) // отключает прокрутку при открытом меню

    return (
        <>
            <Sidebar open={open} handleClose={handleClose} />
            <Header handleOpen={handleOpen} open={open}/>
            <div className={s.content}>
                {/*страницы*/}
                {children}
            </div>
        </>
    )
}
