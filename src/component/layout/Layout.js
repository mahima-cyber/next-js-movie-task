'use client'
import withAuth from '@/HOC/authHoc';
import React from 'react';
import Header from './Header';
import { useSelector } from 'react-redux'
import { AxiosProvider } from '@/service/axios';

const Layout = ({ children }) => {
    const { token } = useSelector((state) => {
        return {
            token: state?.auth?.user?.token
        }
    })
    return (
        <AxiosProvider>
            {token ?
                <>
                    <Header/>
                    {children}
                </> : children
            }
        </AxiosProvider>

    )
}
export default withAuth(Layout);