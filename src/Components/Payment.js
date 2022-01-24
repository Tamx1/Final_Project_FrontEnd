import '../App.css';
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout';




function Payment() {

 
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState('');
  const [user, setUser] = useState();



  const state = useSelector((state) => {
    return {
      user: state.userReducer.user,
      token: state.userReducer.token,
    };
  });

  useEffect(() => {

    if(state.user.user_id !== undefined){
      axios.all([
        axios.get(`https://mazad-website.herokuapp.com/users/${state.user.user_id}`)
      ])
      .then(r => {
        setUser(r[0].data);

         });
      
        }},[]);


       const onToken = (token) => {
          fetch('/pk_test_51KISOjC1rUoqBsLfzZg43azPutLX76mg6PtXYD3pkMs7l51e0WKC16Jn3Pva8fz85CufmmdMk4rpm2bqE0aKlMAZ00E9yhPo6j', {
            method: 'POST',
            body: JSON.stringify(token),
          }).then(response => {
            response.json().then(data => {
              alert(`We are in business, ${data.email}`);
              
            });
          });

          if(balance < 0){setError('Username is incorrect'); return;}

          user.balance =parseInt(user.balance) + parseInt(balance);
          user.email = ''
          user.phone = ''
          user.password = ''
          user.user_name = ''
          axios.put(`https://mazad-website.herokuapp.com/users/${user.user_id}`,user)
                                .then(response => {
                                  if(response.data === 'ok'){
                                    setError('')
                                    window.location.reload();
                                  }
                                });

        }

  return (
<div className='container_Payment'>

<div className="wrapper">
        <nav id="sidebar">
            <div className="sidebar-header">
                <h3>User Profile</h3>
            </div>

            <ul className="list-unstyled components">

                <li>
                    <a  className='a_profile' href="/profile">Acount information</a>
                </li>
                <li>

                </li>
                <li>
                    <a className='a_profile' href="/user_post">My posts</a>
                </li>

                <li>
                    <a className='a_profile' href="/payment">Payment</a>
                </li>
            </ul>

        </nav>


  </div>

  <div>

{user === undefined ? '' :
<div className="mt-50 mb-50 payment-div">
    <div className="card-payment-title mx-auto text-center"> Payment </div>
    <div className="nav-payment">
        <ul className="mx-auto">
            <li className="active-payment"><a href="#">Recharge</a></li>
        </ul>
    </div>
    <div className='form-payment'> 

        <div className="row-1">
            <div className="row row-2"> <span id="card-inner">Enter the amount</span> </div>
            <div className="row row-2"> <input className='input-payment' type="number" onChange={(e)=>{
              setBalance(e.target.value);
            }} placeholder="1000 $" /> </div>
        </div>



        <p className='text-center mt-3'>
        <StripeCheckout
        token={onToken}
        stripeKey="pk_test_51KISOjC1rUoqBsLfzZg43azPutLX76mg6PtXYD3pkMs7l51e0WKC16Jn3Pva8fz85CufmmdMk4rpm2bqE0aKlMAZ00E9yhPo6j"
        name="Card information"
        currency="USD"
        >
      <button className="btn-primary btn btn-pay" >Payment method</button>
    </StripeCheckout>
        {/* <button className="btn-primary btn btn-pay" onClick={()=>{

        if(balance < 0){setError('Username is incorrect'); return;}

          user.balance =parseInt(user.balance) + parseInt(balance);
          user.email = ''
          user.phone = ''
          user.password = ''
          user.user_name = ''
          axios.put(`https://mazad-website.herokuapp.com/users/${user.user_id}`,user)
                                .then(response => {
                                  if(response.data === 'ok'){
                                    setError('')
                                    window.location.reload();
                                  }
                                });
}}><b>Add card</b></button> */}
</p>
    </div>
</div>
  
}
  </div>

  </div>
  );
}

export default Payment;

