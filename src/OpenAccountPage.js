import React from 'react'
import Header from './Header'
import OpenAccountLeft from './OpenAccountLeft'
import OpenAccountRight from './OpenAccountRight'
import './OpenAccountPage.css';

function OpenAccountPage() {
  return (
    <div className='OpenAccountPage__container'>
        <Header/>
        <div className='OpenAccountPage__partition'>
        <OpenAccountLeft/>

        <OpenAccountRight/>
        </div>
    </div> 
  )
}

export default OpenAccountPage