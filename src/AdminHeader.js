import React from 'react'
import { useStateValue } from './StateProvider'
import {useNavigate} from 'react-router-dom'
function AdminHeader() {
    const[{active_admin},dispatch] = useStateValue();
    const navigate = useNavigate();
    console.log(active_admin);
    function handleSign(event){
        console.log(event.target);
        dispatch({
            type: 'Remove_logged_admin',
            logged_admin:null

        })
        navigate('/');
    }
    
  return (
    <div className='Header__container'>
    <div className='Header__bankLogo__div'>
    <img className = 'Header__bankLogo' src="https://logomakercdn.truic.com/ux-flow/industry/bank-meta.png" alt="bank__logo"></img>
    <p className='Header__logo__name'>ZOHO BANKING</p>
    </div>
    <div className='Header__info'>
    <strong>ADMIN PORTAL</strong>
    </div>
    <div className='Header__login'>
        <a className = "Header__login__link" onClick={handleSign} name = 'status'>Sign out</a>
    </div>
    </div>
  )
}

export default AdminHeader