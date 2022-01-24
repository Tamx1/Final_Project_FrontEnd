import '../App.css';
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from 'axios'
import { addUsers, addToken } from '../reducers/Users/Action';
import jwtDecode from 'jwt-decode';




function Login() {
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');


  return (
<div className='login_div'>

<div className="container">

<div className="row">
    <button className="col login_1" onClick={()=>{window.location.replace("/login");}}>
      <p className="text-center text-white mt-3"><b>Login</b></p>
    </button>
    <button className="col Signup_1" onClick={()=>{window.location.replace("/sign_up");}}>
    <p className="text-center text-white mt-3"><b>Sign Up</b></p>
    </button>

  </div>
  </div>
  <div  className='login_div_2'>
  <p className='error_login'>{error}</p>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label text-white">User Name</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>{setUserName(e.target.value)}} />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label text-white">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e)=>{setPassword(e.target.value)}}/>
    <div id="emailHelp" className="form-text mt-1"><a href='#'>forgot password?</a></div>

  </div>

  <p className='btn_login'><button type="submit" className="btn btn-primary nohover mt-3" onClick={()=>{

const user = {
"user_name":userName,
"password":password
}
axios.post(`https://mazad-website.herokuapp.com/login`, user)
      .then((res) => {   

        const decode = jwtDecode(res.data.access_token)
        const actionToken = addToken(res.data.access_token);
        const actionUser = addUsers(decode);
        dispatch(actionUser);
        dispatch(actionToken);
        window.location = "/";
      })
      .catch((err) => {
        console.log(err);
        setError('UserName or password incorrect')
        
      });



  }
  }>Login</button></p>
  </div>
  </div>
  );
}

export default Login;
