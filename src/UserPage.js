import React,{useEffect} from 'react'
import { useStateValue } from './StateProvider'
import './UserPage.css';
import {Link,useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie'; 
import { integerPropType } from '@mui/utils';
function UserPage() {
  const navigate = useNavigate();
  // sessionStorage.getItem('accountNo').toString()
    useEffect(()=>
    {
      console.log(document.cookie);
      fetch('/validation',{
        method:'GET',
        credentials:'include'
      })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
      
      console.log(document.cookie);
    fetch('http://localhost:8080/banking_app/checktransactions?acc='+sessionStorage.getItem('accountNo').toString())
    .then(res => res.json())
    .then(data=>{
      console.log(data);
          if(data.maintenance === "success"){
          sessionStorage.removeItem("balance");
          sessionStorage.setItem("balance",data.getItem("balance"));
        }
        if(data.status5 === "true")
        {
          navigate('/forcePasswordChange');
        }
        else{
        console.log("not yet");
        }
        })  
      })
      
  const [{active_user},dispatch] = useStateValue();
  return (
    <div className = 'UserPage__container'>
      <p>Account number: {sessionStorage.getItem("accountNo")}</p>
      <div className = 'service lineOne'>
        <Link to = '/accountDetails'>
        <button className='userPage__button'>Account Details</button>  
        </Link>
      </div>
      <div className = 'service lineTwo'>
        <Link to = "/deposit">
        <button className='userPage__button'>Cash Deposit</button>  
        </Link>
      </div>
        
      <div className = 'service lineThree'>
      <Link to = '/withdraw'>
        <button className='userPage__button'>Cash Withdrawal</button>
        </Link>
      </div>
      <div className = 'service line4'>
        <Link to = '/transfer'>
        <button className='userPage__button'>Transfer Amount</button>
        </Link>
      </div>
      <div className = "service line5">
        <Link to = '/transactions/details'>
        <button className='userPage__button'>View Transactions</button>
        </Link>
      </div>
      <div className = "service line6">
        <Link to = '/maintenance'>
        <button className='userPage__button'>Maintenance charge details</button>
        </Link>
      </div>
      <div className = "service line7">
        <Link to = '/changePassword'>
        <button className='userPage__button'>Change Password</button>
        </Link>
      </div>
      </div>
  )
}

export default UserPage