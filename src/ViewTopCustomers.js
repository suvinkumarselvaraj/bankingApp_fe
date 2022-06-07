
import React,{useEffect, useState} from 'react'
import { useStateValue } from './StateProvider';
import './ViewTopCustomers.css'
import './ListUsers'
import { useNavigate } from 'react-router-dom';

function ViewTopCustomers() {
    const navigate = useNavigate();
    const [sorting_range, dispatch] = useStateValue();

    const [counts,setCount] = useState(0);
    const [desiredNumber, setDesiredNumber] = useState(0);
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
    function setLength(event){
        console.log(event.target);
        
    }
    
    function sortCustomers(event){
        event.preventDefault();

        var num =desiredNumber;
        if(num>0)
        {
            setDesiredNumber(num);
            console.log(desiredNumber);
            customers.sort(compare);
            setSortedCustomers([]);
            console.log(sortedCustomers);
            for(var i = 0; i<desiredNumber;i++){
                console.log(i);
                sortedCustomers[i] = customers[i];
                console.log(sortedCustomers[i]);
            }
            console.log(sortedCustomers);
            console.log(customers);
            dispatch({
                type: 'Add_sorted_customers',
                 sorting_range:desiredNumber
            });
            navigate('/topcustomers');
            }
       
        }
       

    

  return (
    <div className='ViewTopCustomer__container'>
        <p>{customers.length} records found</p>
        <div className='findTopCx' >
            <p>Enter the number of records to be found</p>
            <form onSubmit={sortCustomers}>
            <input type = "number" min = "0" max = {customers.length}  onChange={e => setDesiredNumber(e.target.value)}></input>
            <button className='sort'>Go</button>
            </form>
        </div>
        </div>
    
  )
}
export default ViewTopCustomers