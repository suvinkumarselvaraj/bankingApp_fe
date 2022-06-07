import React ,{useEffect,useState} from "react"
import './Transactions.css';

function Transactions() {
    var id = sessionStorage.getItem("customerId");
    var i = 0;
    const [accounts,setAccounts] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:8080/banking_app/transactionDetails?id='+id.toString())
            .then(res => res.json())
            .then(data=>{
                setAccounts(data);
                console.log(data);
                for(var i = 0; i<accounts.length;i++){
                    console.log(accounts[i].transactionType);
                }
            })
        },[])

    return (
      <div className='Transactions__container'>
          <div className="row1__container">
              <div className="field1 field">
                  <strong>Transaction ID</strong>
              </div>
              <div className="field2 field">
                  <strong>Transaction Type</strong>
              </div>
              <div className="field3 field">
                  <strong>Amount (Rs)</strong>
              </div>
              <div className="field4 field">
                  <strong>Balance (Rs)</strong>
              </div>
              <div className="filed5 field">
                  <strong>Transaction date</strong>
              </div>
                
          </div>
          
          {accounts?.map(account => (
              <div className="row2__container">
                <div className="field1 field">
                {++i}
            </div>
            <div className="field2 field">
                {account.transactionType}
            </div>
            <div className="field3 field">
            {account.amount}
            </div>
            <div className="field4 field">
            {account.balance}
            </div>
            <div className="filed5 field">
            {account.data}
            </div>

             
                         
          </div>
             ))}

                </div>
    )
  }
  export default Transactions;