import React from 'react'
import './Withdraw.css';
import { useNavigate } from 'react-router-dom';
import { AltRoute } from '@mui/icons-material';
function Withdraw() {
    const navigate = useNavigate();

    function handleWithdrawlSubmit(event){
        event.preventDefault();
        var data = new FormData(event.target);
        const password = data.get("password");
        if((sessionStorage.getItem("balance")-data.get("withdrawlAmount"))<1000)
        {   alert("Perform a withdrawl such that your minimum balance will be maintained over Rs. 1000");
            return;
        }
        var type = "withdrawl";
        const passwordDatas = {'accountNumber':sessionStorage.getItem("accountNo"),'oPass':password};
        fetch('/checkPassword',
        {
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(passwordDatas)
        })
        .then(res => res.json())
        .then(datass =>{
            if(datass.oldPasswordCheck === "success"){
                const datas = {
                    'accountNumber' : sessionStorage.getItem("accountNo"),
                    'customerId' : sessionStorage.getItem("customerId"),
                    'amount' :data.get("withdrawlAmount") ,
                    'balance': sessionStorage.getItem("balance"),
                    'transactionType' : type
                      }
                  
                      fetch('/transactions',{
                          method: 'POST',
                          headers:{
                              'Accept':'application/json',
                              'Content-Type' : 'application/json'
                          },
                          body: JSON.stringify(datas)
                          })
                         .then(res => res.json())
                          .then(datasss =>{
                          if(datasss.status === "success"){
                              console.log("succesfully inserted");
                              sessionStorage.setItem("balance",sessionStorage.getItem("balance")-data.get("withdrawlAmount"));
                            //   sessionStorage.removeItem("balance");
                              
                              alert("withdrawal successful");
                              navigate("/accountDetails",{replace:true});
                            }else
                            alert("something wrong, try again later");
                      })              
                     }else{
                      alert('wrong password. try again!!');
                    }
        })
        
    }
  return (
    <div className = 'Withdraw__container'>Withdraw
        <div className = 'line1'>
            <p>Your available balance Rs.{sessionStorage.getItem("balance")}</p>
            <p>Please note that a minimum balance of Rs.1000 must be maintained once after the withdrawl</p>
        </div>
        <form onSubmit = {handleWithdrawlSubmit}>
        <div className='line2'>
            <p>Enter the amount for withdrawl</p>
            <input type = "number" className = 'input_box' min = '1000' max = '100000' name = 'withdrawlAmount' placeholder='Enter the amount to be withdrawn'></input>
        </div>
        <div className='line3'>
            <p>Enter your password</p>
            <input type = "password" className = 'input_box' name = 'password' placeholder='Enter your password'></input>
        </div>
        <div className='line4'>
            <button className='deposit_submit'>Proceed</button>
        </div>
        </form>
    </div>
  )
}

export default Withdraw;