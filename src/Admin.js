import { JavascriptTwoTone } from '@mui/icons-material';
import React from 'react'
import './Admin.css'
import {useNavigate} from 'react-router-dom';
import { useStateValue } from './StateProvider';

function Admin() {
    const [ active_admin ,dispatch] = useStateValue();
    const navigate = useNavigate();
    
    function handleLoginSubmit(event){

        event.preventDefault();
        var data = new FormData(event.target);
        var adminEmail = data.get('admin_email');
        var adminPassword = data.get('admin_password');
        var datas = {'adminEmail':adminEmail,'adminPassword':adminPassword};
        fetch('/admin/login',{
            method: 'POST',
            headers:{
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(datas)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.status === "success")
            {  
                 dispatch({
                type: 'Add_logged_admin',
                logged_admin:data?.name
            });
                navigate('/admin/home');
            }
            else
            alert("login unsuccessful. check your credentials");
        }) 
    }
  return (
    <div className='Admin__container'>
        <form onSubmit = {handleLoginSubmit}>
        <img className = 'Login__container__logo' src="https://logomakercdn.truic.com/ux-flow/industry/bank-meta.png" alt="bank__logo"></img>
        <div className='Login__container__account__no'>
        <p>Admin mail</p>
        <input type="email" className='Login__container__input__field' placeholder='mail id' name = "admin_email"></input>
        </div>
        <div className='Login__container__account__password'>
        <p>Password</p>
        <input type="password" className='Login__container__input__field' placeholder='password' name = "admin_password"></input>
        </div>
        <div>
        <button className = "Login__button">Login</button>
        </div>
        </form>

    </div>
  )
}

export default Admin