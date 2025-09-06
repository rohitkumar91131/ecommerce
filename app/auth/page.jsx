'use client'
import React from 'react'
import LoginForm from '../components/authPage/LoginForm'
import SignupForm from '../components/authPage/SignupForm'
import { useAuth } from '../context/AuthContext'

function AuthPage() {
    const {isLoginPageInTheWindow} = useAuth();
  return (
    <div>
        {
            isLoginPageInTheWindow
            ?
            <LoginForm/>
            :
            <SignupForm/>
        }
    </div>
  )
}

export default AuthPage
