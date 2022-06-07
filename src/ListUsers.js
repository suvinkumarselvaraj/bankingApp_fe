import React ,{useState, useEffect} from 'react'
import './ListUsers.css'
function ListUsers() {
    
    const [counts,setCount] = useState(0);
    const [customers, setCustomers] = useState([]);
    useEffect(()=>{
        
        fetch('/count')
        .then(res=>res.json())
        .then(data=>{
            
                console.log(data);
                setCustomers(data);
        })
    },[])
    
  return (
    <div className='ListUsers__container'>{customers.length} records found
        <div className='column__name__container'>
        <div className="field1 field">
                <strong> Customer id</strong>
              </div>
              <div className="field2 field">
                  <strong>Account number</strong>
              </div>
              <div className="field3 field">
                  <strong>Name</strong> 
              </div>
              <div className="field4 field">
                  <strong>Phone number</strong>
              </div>
              <div className="filed5 field">
                  <strong>Balance</strong>
              </div>
              <div className='field6 field'>
                  <strong>Date of opening</strong>
              </div>
        </div>
        {customers?.map(account => (
              <div className="row2__container">
                <div className="field1 field">
                {account?.customer_id}
            </div>
            <div className="field2 field">
                {account?.account_number}
            </div>
            <div className="field3 field">
            {account?.name}
            </div>
            <div className="field4 field">
            {account?.phoneNo}
            </div>
            <div className="filed5 field">
            {account?.balance}
            </div>
            <div className="filed6 field">
            {account?.created_at}
            </div>            
          </div>
             ))}
    </div>
  )
}

export default ListUsers