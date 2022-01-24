import '../App.css';
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
import { useSelector } from "react-redux";


function UserPosts() {

  const [posts, setPosts] = useState();
  const [price, setPrice] = useState('');
  const [postPrice, setpostPrice] = useState();
  const [user, setUser] = useState();


  const state = useSelector((state) => {
    return {
      user: state.userReducer.user,
    };
  });


  useEffect(()=>{
   let myInterval = setInterval(() => {

    if(state.user.user_id !== undefined){
      axios.all([
        axios.get(`https://mazad-website.herokuapp.com/users/${state.user.user_id}`)
      ])
      .then(r => {
        setUser(r[0].data);
         });
      }

        

     axios.all([
      axios.get('https://mazad-website.herokuapp.com/posts')
    ])
    .then(r => {
      for(let i = 0 ; i < r[0].data.length ; i++){
         var endTime = new Date(r[0].data[i].date) / 1000;
         var elapsed = new Date() / 1000;
         var totalSec =  endTime - elapsed;
         var h = parseInt( totalSec / 3600 )
         if(h < 0){h = "00"}
         else if(h < 10 ){h = '0'+h.toString();}

         var m = parseInt( totalSec / 60 ) % 60;
         if(m < 0){m = "00"}
         else if(m < 10 ){m = '0'+m.toString();}

         var s = parseInt(totalSec % 60, 10);
         if(s < 0){s = "00"}
         else if(s < 10 ){s = '0'+s.toString();}
         
         var result = h + ":" + m + ":" + s;
         r[0].data[i].date = result;
         if(r[0].data[i].date === "00:00:00"){
            

            r[0].data[i].state = "Close";
            axios.put(`https://mazad-website.herokuapp.com/posts/${r[0].data[i].post_id}`, r[0].data[i])
            .then(response => {});
         }
      }
      setPosts(r[0].data);
   });
      
       axios.all([
        axios.get(`https://mazad-website.herokuapp.com/post_price`)
      ])
      .then(r => {
        setPrice(r[0].data);
         });

      }, 1000)
      return ()=> {
        };
  },[]);

const getPostPrice =(post_id)=>{
for(let i = 0 ; i < price.length ;i++){
  if(post_id === price[i].post.post_id){
    return price[i].price
  }
}
return 0
}

const cheekUser =()=>{
  for(let i = 0 ; i < posts.length ;i++){
    if(posts[i].user.user_id === state.user.user_id){
      return 1
    }
  }
  return 0
  }
  
  return (
<>
<div className='container_User_Post'>

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
                    <a className='a_profile' href="/payment">Payment</a>
                </li>
            </ul>

        </nav>

 


  </div>



{  posts === undefined ? '' :
      cheekUser() === 0 ?
      <header className=" py-5 ">
    <div className="container px-5">
        <div className="row gx-5 justify-content-center">
            <div className="col-lg-6">
                <div className="text-center my-5">
                    <h1 className="display-5 fw-bolder  mb-2 add-post-text">You don't have any posts</h1>
                    <div className="d-grid gap-3 d-sm-flex justify-content-sm-center mt-5">
                        <a className="btn btn-primary btn-lg px-4 me-sm-3" href="/add_post">Get Started with new post</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header> :

<div className='container container_Auctions'>
   
    { posts === undefined ? '' :
   posts.map((element, index) => {
      if(element.user.user_id === state.user.user_id){
   return (
   <section className="main-content" key={index}>
      <div className="container">
         <div className="row">
            <div className="cols-sm-6 cols-md-6 cols-lg-6">
               <div className="food-card food-card--vertical-User-Post">
                 
                  <div className="food-card_content">
                     <div className="food-card_title-section">
                        <a href={`post/${element.post_id}`} className="food-card_title">{element.title}</a>
                        <div>
                           <span className="fa fa-map-marker"></span> <b>{element.city}</b>
                        </div>
                     </div>
                     <div className="food-card_bottom-section">
                        <div className="space-between">
                           <div>
                              <span className="fa fa-clock-o"></span> {element.date}
                           </div>
                           <div className="pull-right">
                           {element.state == "Open" ? <span className="badge badge-success">{element.state}</span> : <span className="badge badge-danger">{element.state}</span>}
                           </div>
                        </div>
                        <div className="food-card_price mr-5 text-center">
                              <span className=''>{getPostPrice(element.post_id)}$</span>
                           </div>
                        <hr/>
                        <div className="">
                        <button type="button" className="btn btn-outline-primary btn-User-Post" onClick={()=>{
                              window.location = `/edit_post/${element.post_id}`
                        }}>Edit Post</button>
                        <button type="button" className="btn btn-outline-danger btn-User-Post mt-2" onClick={()=>{
                               axios.delete(`https://mazad-website.herokuapp.com/posts/${element.post_id}`)
                              .then(() => {});
                              // window.location.reload();
                        }}>Delete Post</button>

                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
   </section>
   )}
   
   })}
   </div>



}
</div></>);}  

export default UserPosts;
