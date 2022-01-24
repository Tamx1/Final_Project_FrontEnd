import '../App.css';
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
import { useParams } from 'react-router-dom';





function EditUserPageForAdmin() {
    const [user, setUser] = useState();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [balance, setBalance] = useState('');
    const [error, setError] = useState('');

    let { id } = useParams();

    useEffect(() => {

          axios.all([
            axios.get(`https://mazad-website.herokuapp.com/users/${id}`)
          ])
          .then(r => {
            setUser(r[0].data);
             });
          
    
            },[]);


  return (
 <div className='users_table'>
    
    <h6 className=" fw-bolder m-5 text-center">{error}</h6>

<table className="table table-striped table-hover">
<thead className='text-center'>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">UserName</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
      <th scope="col">Balance</th>
      <th scope="col">Action</th>
    </tr>
  </thead>

{  user === undefined ? '' :
   
        
      <tr className='text-center'>
      <th scope="row">{user.user_id}</th>
      <td><input type="text" className="form-control" placeholder={user.user_name} onChange={(e)=>{setUserName(e.target.value)}}/></td>
      <td><input type="text" className="form-control" placeholder={user.email} onChange={(e)=>{setEmail(e.target.value)}}/></td>
      <td><input type="text" className="form-control" placeholder={user.phone} onChange={(e)=>{setPhone(e.target.value)}}/></td>
      <td><input type="text" className="form-control" placeholder={user.balance} onChange={(e)=>{setBalance(e.target.value)}}/></td>
      <td>
      <button type="button" className="btn btn-outline-primary" data-mdb-ripple-color="dark"
      onClick={()=>{

          user.user_name = userName;
          user.email = email;
          user.phone = phone;
          user.balance = balance;
          user.password = '';
        axios.all([
            axios.put(`https://mazad-website.herokuapp.com/users/${user.user_id}`, user)
          ])
          .then(r => {
            if(r[0].data !== 'ok'){
                setError(r[0].data)
                                    return
            }else{   window.location = "/admin/users"}
          });


    
      }}>Save</button> 
    </td>
    </tr>
}



</table>

  </div>);}

export default EditUserPageForAdmin;
