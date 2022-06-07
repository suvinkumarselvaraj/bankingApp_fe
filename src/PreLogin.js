

import React from 'react'
import { Link, Route } from 'react-router-dom'
import LoginButton from './LoginButton'
import OpenAccount from './OpenAccount'
import './PreLogin.css'
function PreLogin() {
  return (
    <div className='PreLogin__container'>
      <img className = 'PreLogin__bankLogo' src="https://logomakercdn.truic.com/ux-flow/industry/bank-meta.png" alt="bank__logo"></img>
      <div className='PreLogin__text'>
        <p>Your One Stop Banking App</p>
      </div>
      <Link to = "/login">
      <LoginButton/>
      </Link>
      <OpenAccount />
    </div>
  )
}

export default PreLogin