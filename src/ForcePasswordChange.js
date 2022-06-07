import React from 'react'
import ChangePassword from './ChangePassword'


function ForcePasswordChange() {
  return (
    <div className='change__container'>
        <p>Since you have performed 5 new transactions, you are requested to change your password</p>
        <ChangePassword/>
        
    </div>
  )
}

export default ForcePasswordChange