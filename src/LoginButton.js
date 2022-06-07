import React from 'react'
import './LoginButton.css'
import { Link } from 'react-router-dom'

function LoginButton() {
  return (
    <div className='LoginButton__container'>
        <button className='LoginButton__button' type = 'submit'>Login</button>
    </div>
  )
}

export default LoginButton