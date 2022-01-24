import '../App.css';
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'

function UsersPageForAdmin() {
    const [users, setUsers] = useState();

    useEffect(() => {

          axios.all([
            axios.get(`https://mazad-website.herokuapp.com/users`)
          ])
          .then(r => {
            setUsers(r[0].data);
             });
          
    
            },[]);

  return (
 <div className='users_table'>
<table className="table table-striped table-hover ">
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

{  users === undefined ? '' :
   users.map((element, index) => {
        
        return (<tr className='text-center' key={index}>
      <th scope="row">{element.user_id}</th>
      <td>{element.user_name}</td>
      <td>{element.email}</td>
      <td>{element.phone}</td>
      <td>{element.balance}</td>
      <td><button type="button" className="btn btn-outline-primary mr-5" data-mdb-ripple-color="dark" onClick={()=>{
        window.location = `/admin/edit_user/${element.user_id}`
      }}>Edit user info</button>
      <button type="button" className="btn btn-outline-danger" data-mdb-ripple-color="dark"
      onClick={()=>{
        axios.all([
            axios.delete(`https://mazad-website.herokuapp.com/users/${element.user_id}`)
          ])
          .then(r => {
            axios.all([
            axios.get(`https://mazad-website.herokuapp.com/users`)
          ])
          .then(r => {
            setUsers(r[0].data);
             });
             });


    
      }}>Delete user</button></td>
    </tr>);


   })}

</table>

  </div>);}

export default UsersPageForAdmin;
