import React from 'react'
import './Deposit.css'
import { useNavigate } from 'react-router-dom';
function Deposit() {
  const navigate = useNavigate();
  function handleSubmit(event){
    event.preventDefault();
    var data = new FormData(event.target);
    var amount = data.get("deposit_amount");
    if(amount<1000 && amount > 999999)
    {
      alert("It is possible to depoist amount only within the given range: Rs. 1000 to Rs. 999999");
      return;
    }
    const passwordDatas = {'accountNumber':sessionStorage.getItem("accountNo"),'oPass':data.get('password')};
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
    var type = "deposit";
    var deposit_data = {
      'accountNumber' : sessionStorage.getItem("accountNo"),
      'customerId' : sessionStorage.getItem("customerId"),
      'amount' : amount,
      'balance': sessionStorage.getItem("balance"),
      'transactionType' : type
    }
    fetch('/transactions',{
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(deposit_data)
    })
    .then(res => res.json())
    .then(data => {
      if(data.status === "success"){
        console.log("succesfully inserted");
        sessionStorage.removeItem("balance");
        sessionStorage.setItem("balance",data.balance);
        alert("successfully deposited");
        navigate("/accountDetails",{replace:true});
      }else
      alert("something wrong, try again later");
    })
  }else
  {
    alert("wrong password. try again!!");
  }
  })
}
  return (
     <div className = 'Deposit__container'>
    <p>Deposit</p>
        <form onSubmit = {handleSubmit}>
        <div className = 'line1'>
        <p>Enter the amount to be deposited</p>
        <input className = "input_box" type="number" min = '1000' max = '9999999' name = "deposit_amount"></input>      
        </div>
        <div className = 'line2'>
        <p>Enter the password</p>
        <input className = "input_box"  type="password" name = "password"></input>      
        </div>
        <button type = "submit_button" className = "deposit_submit">Deposit</button>
        </form>
    </div>
    
  )
}

export default Deposit