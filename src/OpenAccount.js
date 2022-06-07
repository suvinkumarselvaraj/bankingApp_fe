import React from 'react'
import './OpenAccount.css'
import { Link } from 'react-router-dom';
function OpenAccount() {
  return (
    <div className='OpenAccount__container'>
        <Link to = '/openaccount'>
        <button type='button' className='OpenAccount__button'>
                Open Account
            </button>
            </Link>
    </div>
  )
}

export default OpenAccount