import React, { useEffect } from 'react'
import { useStateValue } from './StateProvider'
import { Link } from 'react-router-dom';
import './AdminPage.css'
function AdminPage() {
    const [{active_admin},dispatch] = useStateValue();
    useEffect(()=>{

    })
  return (
    <div className='AdminPage__container'>
        <div className='adminLine1'>
        <strong>Welcome {active_admin.toUpperCase()}</strong>
        </div>
        <div className='options__container'>
            <div className='add__customer'>
                <Link to = '/adminAddNewCx'>
                <button className='addCustomer'>Add new customer</button>
                </Link>
            </div>
            <div className='view__customer'>
                <Link to = '/viewTopCustomers'>
                <button className='viewCustomer'>View top customer</button>
                </Link>
            </div>
            <div className='view__customer__totally'>
                <Link to = '/users'>
                <button className='viewCustomer'>List users</button>
                </Link>
            </div>

        </div>
    </div>
  )
}

export default AdminPage