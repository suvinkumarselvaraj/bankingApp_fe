import React from 'react'
import { useNavigate } from 'react-router-dom';

function AdminNewUser() {
    const navigate = useNavigate();
    function handleOpenAccountSubmit(event){
        event.preventDefault();
        var data = new FormData(event.target);
        var name = data.get('username');
        var phone = data.get('phone');
        var password1 = data.get('password1');
        var password2 = data.get('password2');
        if(name==='' || password1 === '' || password2 === ''||phone === '')
        {   
            alert("Empty field value");
            return;
        }
        for(var i = 0; i<name.length;i++){
            if((name[i]>='a'&&name[i]<='z')||(name[i]>='A'&&name[i]<='Z') )
            continue;
            alert('Incorrect username- username must not contain anything other than alphabets (a-z or A-Z)');
            return;
        }
        //password validation
        
        if(password1!=password2)
        {
            alert("Both the passwords doesn't match");
            return;
        }
        if(password1.length<6 || password1.includes(" "))
        {
            alert("Password badly formatted");
            return;
        }
        var uCase = 0;  
        var lCase = 0;
        var nCase = 0;
        for(var i = 0; i<password1.length;i++){
            if(password1[i]>='a'&&password1[i]<='z')
            uCase++;
            else
            if(password1[i]>='A'&&password1[i]<='Z')
            lCase++;
            else
            if(password1[i]>=0 && password1[i]<=9)
            nCase++;

        }
        if(uCase<2 || lCase<2 || nCase<2) 
        {
            alert("Password must contain atleast 2 upper case characters, 2 lower case characters and 2 integers");
            return;
        }

        const userData = {'username':name, 'phone':phone, 'password':password1}
        fetch('/newAccount', {
        method: 'POST', // or 'PUT'
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },    
        body: JSON.stringify(userData),
        })
        .then(res => res.json())
        .then(data => {  
          console.log(data.isExistingUser);
          if(data.isExistingUser === "existing")
          {
              console.log("hello");
              alert("There is already an existing user with the phone number given.");
              return;
          }
          else{
            console.log("inside opening area");
            var type = "Opening";
            var username = data.username;
            var accountNumber = data.accountNumber;
            var phoneNo = data.phoneNo;
            var balance = data.balance;
            var customerId = data.customerId;
            var initialAmount = 10000;
            const datas = {
            'accountNumber' : accountNumber.toString(),
            'customerId' :customerId.toString(),
            'amount' :initialAmount.toString(),
            'balance':balance.toString(),
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
        .then(data =>{
            if(data.status === "success"){
                console.log("succesfully inserted");
                alert("Opening successful");
                navigate('/admin/home')
              }else
              alert("something wrong, try again later");
        })   
          }
           
      })
      .catch((error)=>{
          console.log(error);
      })

    }
  return (
    <div>
        <div className='information'>
            <p>Add new user</p>
        </div>
        <form onSubmit={handleOpenAccountSubmit}>
        <div className='line11'>
        <input className = "username_input uinput" type="text" placeholder="full name" name = "username"></input>
        <br></br>
        <small>No spaces are allowed</small>
        </div>
        <div>
        <input className = "number_input uinput"type="tel" id="phone" name="phone" pattern="[0-9]{10}" placeholder='phone number'></input>
        <br></br>
        <small>eg. 9876543210</small>
        </div>
        <div>
        <input className = "password_input uinput" type="password" placeholder="password" name = "password1"></input>
        <br></br>
        <small>Should not be less than 6 characters</small>
        <br></br>
        <small>must contain atleast 2 upper case</small><br></br> <small>
            2 lower case and 2 integers </small>
        </div>
        <div>
        <input className = "re_password_input uinput" type="password" placeholder="re-enter password" name = "password2"></input>
        <br></br>
        <small>must match the above password</small>
        </div>
        <div className='OpenAccountRight__submit__button'>
        <button className='OpenAccount__submit__button'>Submit</button>
        </div>
        </form>
    </div>
  )
}

export default AdminNewUser