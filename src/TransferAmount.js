import React,{useEffect,useState} from 'react'
import './TransferAmount.css'
import { useNavigate } from 'react-router-dom';
function TransferAmount() {
    const navigate = useNavigate();
    const [accounts,setAccounts] = useState([]);
    useEffect(()=>{
        fetch('/availableCustomers')
            .then(res => res.json())
            .then(data=>{
                setAccounts(data);
                console.log(data);
            })

    },[])
    function handleTransfer(event){
        event.preventDefault();
        var data = new FormData(event.target);
        var amount = data.get("transferAmount");
        console.log(amount);
        var acc1 = data.get("account_number1");
        var acc2 = data.get("account_number1");
        if(acc1!==acc2||acc1===''||acc2=='')
        {
            alert("account numbers entered doesnt match the record");
            return;
        }

        if(sessionStorage.getItem("balance")-amount<1000){
            alert('Minimum balance of Rs.1000 should be maintained post the transaction. Transfer not possile');
            return;
        }

         if(amount<1000 || amount > 100000)
            {
                alert("It is possible to depoist amount only within the given range: Rs. 1000 to Rs. 100000");
                return;
            }
            var flag = 0;
        
        for(var i = 0; i<accounts.length;i++){
            
            if(accounts[i].accountNumber === acc1)
            flag = 1;
        }

        if(flag === 0){
            alert('Account number entered does not match the bank records. Try again');
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
            if(datass.oldPasswordCheck !== "success"){
                alert('wrong password. try again');
                return;
            }
            else
            {
                var transfer_data;
        var type = "Transfer to "+acc1.toString();
        if(amount>5000)
        {
            var type2 = "Maintenance fee";
            transfer_data = {
                'accountNumber' : sessionStorage.getItem("accountNo"),
                'customerId' : sessionStorage.getItem("customerId"),
                'amount' : amount,
                'balance': sessionStorage.getItem("balance"),
                'transactionType' : type,
                'transactionType2' : type2,
                'receiverAccountNumber' : acc1.toString()
                  }
                }
                else 
                {
                    transfer_data = {
                        'accountNumber' : sessionStorage.getItem("accountNo"),
                        'customerId' : sessionStorage.getItem("customerId"),
                        'amount' : amount,
                        'balance': sessionStorage.getItem("balance"),
                        'transactionType' : type,

                        'receiverAccountNumber' : acc1.toString()
                          }
        
                }                
        fetch('/transfer',{
            method: 'POST',
            headers:{
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(transfer_data)
            })
        .then(res => res.json())
        .then(data =>{
            if(data.status === "success"){
                console.log("succesfully inserted");
                sessionStorage.removeItem("balance");
                sessionStorage.setItem("balance",data.balance);
                alert("Transaction successful");
                navigate("/accountDetails",{replace:true});
              }else
              alert("something wrong, try again later");
        })   
            }
        })
        .catch(err => console.error(err));
        
    }
  return (
    <div className='TransferAmount__container'>
        <form onSubmit={handleTransfer}>
        <div className='line1'>
            <p>Transfer money online instantly</p>
        </div>
        <div className='line2'>
            <p>Available balance : Rs.{sessionStorage.getItem("balance")}</p>
            <p>Please Note that the minimum balance of Rs.1000 must be maintained after the cash transfer</p>
        </div>
        <div className='line3'>
            <p>Enter the receiver account number </p>
            <input type = 'text' className='accountNumber_input uinput' placeholder='Account number ' name = 'account_number1'></input>
        </div>
        <div className='line4'>
            <p>Re-enter the account number for transaction</p>
            <input type = 'text' className='accountNumber_input uinput' placeholder='Re-enter account number' name = 'account_number2'></input>
        </div>
        
        <div className='line5'>
            <p>Enter the amount to transfer</p>
            <input type = 'number' className='transfer_amount uinput' placeholder='Enter the amount' name = 'transferAmount'></input>
        </div>
        <div className='line6'>
            <p>Enter the password</p>
            <input type = 'password' className='password_field uinput' placeholder='Your password' name = 'password'></input>
        </div>
        
        <div className='line7'>
            <button className='proceed'>Proceed</button>
        </div>
        </form>
    </div>
  )
}

export default TransferAmount