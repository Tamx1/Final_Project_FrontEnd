import '../App.css';
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'


function AdminPage() {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {

        axios.all([
            axios.get(`https://mazad-website.herokuapp.com/users`)
          ])
          .then(r => {
            setUsers(r[0].data);
             });
        
        axios.all([
          axios.get(`https://mazad-website.herokuapp.com/posts`)
        ])
        .then(r => {
          setPosts(r[0].data);
           });

           axios.all([
            axios.get(`https://mazad-website.herokuapp.com/comments`)
          ])
          .then(r => {
            setComments(r[0].data);
             });


          },[]);


  return (
 <div>
<div className="container">
    <div className="row row-admin">
        <a href='/admin/users' className="col-md-4 col-xl-3 link-admin">
            <div className="card card-admin-users order-card">
                <div className="card-block">
                    <h6 className="m-b-20">Users</h6>
                    <h2 className="text-right mt-2"><i className="fa fa-users f-left"></i><br></br></h2>
                    <p className="m-b-0">Number of users<span className="f-right">{users.length}</span></p>
                </div>
            </div>
        </a>
         
        <a href='/admin/posts' className="col-md-4 col-xl-3 link-admin">
            <div className="card card-admin-posts order-card">
                <div className="card-block">
                    <h6 className="m-b-20">Posts</h6>
                    <h2 className="text-right mt-2"><i className="fa fa-clipboard f-left"></i><br></br></h2>
                    <p className="m-b-0">Number of Posts<span className="f-right">{posts.length}</span></p>
                </div>
            </div>
        </a>
        
        <a href='admin/comments' className="col-md-4 col-xl-3 link-admin">
            <div className="card card-admin-comments order-card">
                <div className="card-block">
                    <h6 className="m-b-20">Comments</h6>
                    <h2 className="text-right mt-2"><i className="fa fa-commenting f-left"></i><br></br></h2>
                    <p className="m-b-0">Number of comments<span className="f-right">{comments.length}</span></p>
                </div>
            </div>
        </a>
        
        <a href='' className="col-md-4 col-xl-3 link-admin">
            <div className="card card-admin-messages order-card">
                <div className="card-block">
                    <h6 className="m-b-20">Messages</h6>
                    <h2 className="text-right mt-2"><i className="fa fa-envelope f-left"></i><br></br></h2>
                    <p className="m-b-0">Number of messages<span className="f-right">0</span></p>
                </div>
            </div>
        </a>
	</div>
    
</div>

  </div>);}

export default AdminPage;
