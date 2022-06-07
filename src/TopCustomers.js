import React ,{useState,useEffect} from 'react'
import { useStateValue } from './StateProvider';

function TopCustomers() {
    const [sorting_range,dispatch] = useStateValue();
    const [customers, setCustomers] = useState([]);
    const [sortedCustomers, setSortedCustomers] = useState([]);
    useEffect(()=>{
        fetch('/count')
        .then(res=>res.json())
        .then(data=>{
                console.log(data);
                setCustomers(data);
                
        })
    },[])
    function compare(cx1, cx2){
        if(cx1.balance > cx2.balance)
        return -1;
        else 
        return 1;
    }
    console.log('sorting');
    customers.sort(compare);
    console.log(customers);
    console.log(sorting_range.sorting_range);
    //register the sorted customers
    for(var i = 0; i<sorting_range.sorting_range;i++ ){
        sortedCustomers[i] = customers[i];
    }
    
    console.log(sortedCustomers);
  return (
    <div>
        <div className='blockLevel'>
        <div className='UserAccount__container'>
            <div className="field1 field">
                 Customer id
              </div>
              <div className="field2 field">
                  Account number
              </div>
              <div className="field3 field">
                  Name 
              </div>
              <div className="field4 field">
                  Phone number
              </div>
              <div className="filed5 field">
                  Balance
              </div>
              <div className='field6 field'>
                  Date of opening
              </div>
            </div> 
        </div>   
    {sortedCustomers?.map(account => (
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

export default TopCustomers