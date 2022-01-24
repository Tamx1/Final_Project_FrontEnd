import '../App.css';
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from 'axios'




function Profile() {

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState();
  const [loding, setLoding] = useState(false);



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

        const uploadImg = async (e) =>{
          const files = e.target.files;
          const data = new FormData();
          data.append('file', files[0]);
          data.append('upload_preset', 'jeykewbu');
          setLoding(true);
        
          const res = await fetch("https://api.cloudinary.com/v1_1/dtqxphvwc/image/upload",
          {
            method:'POST',
            body:data
          })
        
          const file = await res.json();
          user.img = file.url;
          setLoding(false)
        
        }
      
  return (
<div className='container_Profile'>

<div className="wrapper">
        <nav id="sidebar">
            <div className="sidebar-header">
                <h3>User Profile</h3>
            </div>

            <ul className="list-unstyled components">

                <li>
                    <a className='a_profile' href="/profile">Acount information</a>
                </li>
                <li>

                </li>
                <li>
                    <a className='a_profile' href="/user_post">My posts</a>
                </li>

                <li>
                    <a className='a_profile' href="payment">Payment</a>
                </li>
            </ul>

        </nav>

 


  </div>


  <div>

{user === undefined ? '' :
<div className='Edit_Acount_div'>
<div className="container">

<div className="row">
    <button className="col Edit_profile_2" onClick={()=>{window.location.replace("/profile");}}>
      <p className="text-center text-white mt-3"><b>Acount information</b></p>
    </button>


  </div>
  </div>


  <div  className='login_div_2'>
  <p className='error_login'>{error}</p>
  <p className='text-center'><img src={user.img} className="rounded-circle" height="90" alt="" loading="lazy" /></p>

  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label text-white" >UserName</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={"@"+user.user_name} disabled/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label text-white">Email address</label>
    <input type="email" className="form-control" id="exampleInputPassword1" placeholder={user.email}  onChange={(e)=>{setEmail(e.target.value)}}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label text-white">Phone</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder={user.phone} onChange={(e)=>{setPhone(e.target.value)}}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label text-white">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="******************" onChange={(e)=>{setPassword(e.target.value)}}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label text-white">Re-Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="******************" onChange={(e)=>{setRePassword(e.target.value)}}/>
  </div>


   {loding ?  <div className='text-center'>     <br></br>    <div className="spinner-border text-secondary" role="status">
              <span className="sr-only text-center">Loading...</span>
            </div> <br></br>  </div>  :<>
            <label htmlFor="exampleInputPassword1" className="form-label text-white">Picture</label>
            <input className="form-control mb-4" type="file" id="formFileMultiple" accept="image/png, image/gif, image/jpeg" multiple onChange={(e)=>{
                  uploadImg(e);
                }} />  

  <p className='btn_login'><button type="button" className="btn btn-primary nohover mt-5" onClick={()=>{
    if(password !== rePassword && password !== '' && rePassword !== ''){setError('There is no match in the password'); return;}
    user.email = email;
    user.phone = phone;
    user.password = password;

    axios.put(`https://mazad-website.herokuapp.com/users/${user.user_id}`,user)
    .then(response => {
    if(response.data !== 'ok'){
     setError(response.data);
      return
    }else{  window.location.reload(); }
});
    
  }}>Save changes</button></p></>}
  </div>
  </div>
  
}
  </div>

  </div>
  );
}

export default Profile;
