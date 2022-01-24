import '../App.css';
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'





function CommentsPageForAdmin() {
    const [comments, setComments] = useState();

    useEffect(() => {

          axios.all([
            axios.get(`https://mazad-website.herokuapp.com/comments`)
          ])
          .then(r => {
            setComments(r[0].data);
             });
            },[]);


  return (
 <div className='users_table'>
<table className="table table-striped table-hover ">
<thead className='text-center'>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Post Title</th>
      <th scope="col">User Name</th>
      <th scope="col">Content</th>
      <th scope="col">Action</th>
    </tr>
  </thead>{  comments &&
comments.map((element, index) => {
        
        return (<tr className='text-center' key={index}>
      <th scope="row">{element.comment_id}</th>
      <td>{element.post.title}</td>
      <td>{element.user.user_name}</td>
      <td>{element.content}</td>
      <td><button type="button" className="btn btn-outline-danger" data-mdb-ripple-color="dark"
      onClick={()=>{
        axios.all([
            axios.delete(`https://mazad-website.herokuapp.com/comments/${element.comment_id}`)
          ])
          .then(r => {
            axios.all([
            axios.get(`https://mazad-website.herokuapp.com/comments`)
          ])
          .then(res => {
              console.log(res)
            setComments(res[0].data);
             });
          });



    
      }}>Delete post</button></td></tr>);


   })}</table>

  </div>);}

export default CommentsPageForAdmin;
