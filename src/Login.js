import React, { useEffect } from 'react'
import { act } from 'react-dom/test-utils';

import './Login.css';
import LoginButton from './LoginButton';
import OpenAccount from './OpenAccount';
import { useStateValue } from './StateProvider';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
 
    const navigate = useNavigate();
    const [active_user,dispatch] = useStateValue();
    function handleLogin(event){
        // event.preventDefault();
        console.log(event.target);
        
    }
    function handleLoginSubmit(event){
        event.preventDefault();
        var data = new FormData(event.target);
        console.log(data.get("account_no"));
        console.log(data.get("account_password"));
        //backend call
        var accountNumber = data.get("account_no");
        var password = data.get("account_password");

        if(accountNumber === ''||password === ''){
            alert("Empty field values not allowed");
            return;
        }
        var userData = {'accountNumber':accountNumber,'password':password};
        if(accountNumber >= 11011 && password.length >=6)
        {
            fetch('/login', {
            method: 'POST', // or 'PUT'   x-www-form-urlencoded
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },    
            body: JSON.stringify(userData),
            })
            .then(res => res.json())
            .then(data => {  
              console.log(data);
              if(data.status === "failure")
              {
                  alert("wrong username or password, check your credentials again");
                  return;
              }
              else{
                  sessionStorage.setItem("username",data.username);
                  sessionStorage.setItem("accountNo",accountNumber);
                  sessionStorage.setItem("phoneNo",data.phoneNo);
                  sessionStorage.setItem("balance",data.balance);
                  sessionStorage.setItem("customerId",data.customerId);
                  //sessionStorage.setItem("accountBalance",);
                  dispatch({
                      type: 'Add_logged_user',
                      logged_user: sessionStorage.getItem("username")
                  });
                //   alert("success");
                navigate("/home", { replace: true });
              }
          })
          .catch((error)=>{
              console.log(error);
          })
        }
        else{
            alert("check your credentials and try again");
            return;
        }
    }
    function handleOpenAccount(event){

    }
  return (
    <div className='Login__container'>
        
        <form onSubmit = {handleLoginSubmit}>
        <img className = 'Login__container__logo' src="https://logomakercdn.truic.com/ux-flow/industry/bank-meta.png" alt="bank__logo"></img>
        <div className='Login__container__account__no'>
        <p>Account Number</p>
        <input type="text" className='Login__container__input__field' placeholder='Enter your account number' name = "account_no"></input>
        </div>
        <div className='Login__container__account__password'>
        <p>Password</p>
        <input type="password" className='Login__container__input__field' placeholder='Enter your password' name = "account_password"></input>
        </div>
        <div>
        <button className = "Login__button" onClick={handleLogin}>Login</button>
        <div>
            <small>Don't have an account?</small>
            <Link to = "/openaccount">
        <button className = "Login__Open__button" onClick={handleOpenAccount}>Open account</button>
        </Link>
        </div>
        </div>
        <div>
        <a href = "/admin">admin?</a>
        </div>
        </form>
        
    </div>
  )
}

export default Login