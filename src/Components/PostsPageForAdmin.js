import '../App.css';
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'





function PostsPageForAdmin() {
    const [posts, setPosts] = useState();

    useEffect(() => {

          axios.all([
            axios.get(`https://mazad-website.herokuapp.com/posts`)
          ])
          .then(r => {
            setPosts(r[0].data);
             });
          
    
            },[]);


  return (
 <div className='users_table'>
<table className="table table-striped table-hover ">
<thead className='text-center'>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Title</th>
      <th scope="col">City</th>
      <th scope="col">Type</th>
      <th scope="col">State</th>
      <th scope="col">Price</th>
      <th scope="col">Action</th>
    </tr>
  </thead>

{  posts === undefined ? '' :
   posts.map((element, index) => {
        
        return (<tr className='text-center' key={index}>
      <th scope="row">{element.post_id}</th>
      <td>{element.title}</td>
      <td>{element.city}</td>
      <td>{element.post_type}</td>
      <td>{element.state}</td>
      <td>{element.price}$</td>
      <td><button type="button" className="btn btn-outline-primary mr-5" data-mdb-ripple-color="dark" onClick={()=>{
        window.location = `/edit_post/${element.post_id}`
      }}>Edit post info</button>
      <button type="button" className="btn btn-outline-danger" data-mdb-ripple-color="dark"
      onClick={()=>{
        axios.all([
            axios.delete(`https://mazad-website.herokuapp.com/posts/${element.post_id}`)
          ])
          .then(r => {
            axios.all([
            axios.get(`https://mazad-website.herokuapp.com/posts`)
          ])
          .then(res => {
              console.log(res)
            setPosts(res[0].data);
             });
          });



    
      }}>Delete post</button>
      </td>
    </tr>);


   })}

</table>

  </div>);}

export default PostsPageForAdmin;
