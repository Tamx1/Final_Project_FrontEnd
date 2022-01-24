import '../App.css';
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";



function Auctions() {

  const [post, setPost] = useState();
  const [comment, setComment] = useState();
  const [price, setPrice] = useState('');
  const [postPrice, setpostPrice] = useState();
  const [user, setUser] = useState();
  const [lastPaidUser, setLastPaidUser] = useState();
  const [addComeent, setAddComeent] = useState('');




  const state = useSelector((state) => {
    return {
      user: state.userReducer.user,
      token: state.userReducer.token,
    };
  });



  let { id } = useParams();



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


const config = {
  headers: { Authorization: `Bearer ${state.token}` }
};
    axios.all([
      axios.get(`https://mazad-website.herokuapp.com/posts/${id}`)
    ])
    .then(r => { 
         var endTime = new Date(r[0].data.date) / 1000;
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
         r[0].data.date = result;
         if(r[0].data.date === "00:00:00"){
            

            r[0].data.state = "Close";
            axios.put(`https://mazad-website.herokuapp.com/posts/${r[0].data.post_id}`, r[0].data)
            .then(response => {});
         }
      
      setPost(r[0].data);
   });
  
       axios.all([
        axios.get(`https://mazad-website.herokuapp.com/comments/${id}`)
      ])
      .then(r => {
        setComment(r[0].data);
         });
         axios.all([
          axios.get(`https://mazad-website.herokuapp.com/post_price/${id}`)
        ])
        .then(r => {
          setPrice(r[0].data);

          axios.all([
            axios.get(`https://mazad-website.herokuapp.com/users/${r[0].data.user.user_id}`)
            ])
            .then(res => {

              setLastPaidUser(res[0].data);
        
            });

           });
      

        
  
      }, 1000)
      return ()=> {
        };
  },[]);

  const cheekUser =(post_id)=>{
    for(let i = 0 ; i < price.length ;i++){
      if(post_id === price[i].post.post_id){
        if(price[i].user.user_id === state.user.user_id)
        return 1
      }
    }
    return 0
    }




  return (<>
    {post === undefined ? '' :
    <>
    <div className="container-fluid">
       <div className="row ">
          <div className="col-12 mt-3 ">
             <div className="card row-post shadow-lg  rounded">
                <div className="card-horizontal" >
                   <div className="card-body w-25 h-25">
                      <h4 className="card-title text-white text-left">{post.title}</h4>
                      
                      <p className="card-text m-0">
                         <small>
                      <span className="fa fa-user post-icon"></span> <b className='text-white'>@{post.user.user_name}</b>
                      </small></p>

                      <p className="card-text m-0">
                         <small>
                      
                      <span className="fa fa-map-marker post-icon"></span> <b className='text-white'>{post.city}</b>
                      </small></p>
                      <p className="card-text m-0 text-white  text-left">                                
                      
                         <span className="fa fa-clock-o post-icon"></span> {post.date}
                      
                      </p>
                      <hr>
                      </hr>
                   </div>
                </div>
                <div className="card-footer card-footer-post">
                   <small className="text-muted">
                   <div className="newsletter-subscribe">
        <div className="container">
            <div className="intro">
                <h6 className=" m-5">{post.content}</h6>
                <hr className='mt-5'></hr>
                <div className="text-center card-text m-0">                      
                         
                     <h6>Last of the payment</h6>
                      <span className="fa fa-user"></span><b> {lastPaidUser === undefined ? '' : lastPaidUser.user_name}  </b>
                      <br></br><span className="fa fa-money"></span> <b> {price.price}$</b>

                      </div>
            </div>
            <div className="input-group mb-3 mt-1 ml-5 mr-5">
            <input type="number" className="form-control" placeholder="Enter your price" aria-label="Example text with button addon" aria-describedby="button-addon1" onChange={(e)=>{
                                 setpostPrice(e.target.value);
                                 }} />  <div className="input-group-append">
                <button className="btn btn-outline-secondary mr-5" type="submit" onClick={()=>{
                                    var modal = document.querySelector('.modal');
                                    var span = document.getElementsByClassName("btn-close")[0];
                                    var span2 = document.getElementsByClassName("close_btn")[0];
                                    span.onclick = function() {
                                    modal.style.display = "none";
                                    }
                                    span2.onclick = function() {
                                    modal.style.display = "none";
                                    }
                                    window.onclick = function(event) {
                                    if (event.target == modal) {
                                    modal.style.display = "none";
                                    }
                                    }
                                    if(localStorage.getItem('user') === null){
                                    modal.style.display = "block";
                                    document.querySelector('.modal-title').innerHTML = 'Login'
                                    document.querySelector('.error_text').innerHTML = 'You must first log in to enter the auction'
                                    return
                                    }
                                    if(postPrice !== undefined && postPrice <= price.price){
                                    modal.style.display = "block";
                                    document.querySelector('.modal-title').innerHTML = 'Eroor'
                                    document.querySelector('.error_text').innerHTML = 'The entered price is lower than the current price'
                                    return
                                    }
                                    if(postPrice === undefined){
                                    modal.style.display = "block";
                                    document.querySelector('.modal-title').innerHTML = 'Eroor'
                                    document.querySelector('.error_text').innerHTML = 'The entered price is lower than the current price'
                                    return
                                    }
                                    if(user.balance - postPrice < 0){
                                    modal.style.display = "block";
                                    document.querySelector('.modal-title').innerHTML = 'Eroor'
                                    document.querySelector('.error_text').innerHTML = 'Your balance is low'
                                    return
                                    }
                                    if(state.user.user_id === post.user.user_id){
                                    modal.style.display = "block";
                                    document.querySelector('.modal-title').innerHTML = 'Eroor'
                                    document.querySelector('.error_text').innerHTML = 'You cannot bid on your post'
                                    return
                                    }
                                    if(cheekUser(post.post_id) === 1){
                                    modal.style.display = "block";
                                    document.querySelector('.modal-title').innerHTML = 'Eroor'
                                    document.querySelector('.error_text').innerHTML = 'You are the last bidder on this post'
                                    return
                                    }
                                    axios.all([axios.get(`https://mazad-website.herokuapp.com/post_price/${post.post_id}`)
                                    ])
                                    .then( r => {
                                    const userId = r[0].data.user.user_id;
                                    axios.all([
                                    axios.get(`https://mazad-website.herokuapp.com/users/${userId}`)
                                    ])
                                    .then(res => {
                                    const userInfo = r[0].data.user;
                                    userInfo.balance = parseInt(userInfo.balance) + parseInt(price.price);
                                    axios.put(`https://mazad-website.herokuapp.com/users/${userInfo.user_id}`,userInfo)
                                    .then(response => {});
                                    });
                                    });
                                    const updatePostPrice = {
                                    "price": postPrice,
                                    "user": user,
                                    }
                                    axios.put(`https://mazad-website.herokuapp.com/post_price/${post.post_id}`,updatePostPrice)
                                    .then(response => {console.log(response)});
                                    user.balance =parseInt(user.balance) - parseInt(postPrice);
                                    axios.put(`https://mazad-website.herokuapp.com/users/${user.user_id}`,user)
                                    .then(response => {});
                                    setpostPrice(undefined)
                                    window.location.reload(); 
                                    // Get the modal
                                    }}>Buy</button>  </div>
</div>
</div>
        </div>
    </small>
                </div>
             </div>
          </div>
       </div>
    </div>
    </>
    }
    <div className='comments_div'>
       {comment === undefined ? '' :
       comment.map((element, index) => {
       return ( <div key={index}>
         <div className="containern">
<div className="row">
    <div className="col-md-8n ">
        <div className="media g-mb-30 media-comment ">
            <img className="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15" src={element.user.img} alt="Image Description" />
            <div className="media-body u-shadow-v18 g-bg-secondary g-pa-30 shadow rounded">
              <div className="g-mb-15">
                <h5 className="h5 g-color-gray-dark-v1 mb-0"><b>{element.user.user_name}</b></h5>
                <span className="g-color-gray-dark-v4 g-font-size-12">5 days ago</span>
              </div>
        
              <p>{element.content}</p>
        
              <ul className="list-inline d-sm-flex my-0">
                <li className="list-inline-item g-mr-20">
                  <a className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover" href="#!">
                    <i className="fa fa-thumbs-up g-pos-rel g-top-1 g-mr-3"></i>
                    0
                  </a>
                </li>
                <li className="list-inline-item g-mr-20">
                  <a className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover" href="#!">
                    <i className="fa fa-thumbs-down g-pos-rel g-top-1 g-mr-3"></i>
                    0
                  </a>
                </li>
                <li className="list-inline-item ml-auto">
                  <a className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover" href="#!">
                    <i className="fa fa-reply g-pos-rel g-top-1 g-mr-3"></i>
                    Reply
                  </a>
                </li>
              </ul>
            </div>
        </div>
    </div>
</div>
</div>


       </div>)})}
       
       {state.user.user_id === undefined ? '' : 
       <div className="media g-mb-30 media-comment ">
            <p className="d-flex g-width-50 g-height-50 g-mt-3 g-mr-15"  />
       <div className="media-body u-shadow-v18 g-bg-secondary g-pa-30 shadow rounded" src={"fa fa-comment"}>
             <label htmlFor="exampleInputEmail1" className="form-label">Write comment</label>
             <textarea className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  rows="4" cols="50" onChange={(e)=>{
               setAddComeent(e.target.value);
             }}></textarea>
             <p className='text-center mt-5'><button type="submit" className="btn btn-primary" onClick={()=>{
            const userComeent = {
                      "comment":
                      {
                          "content":addComeent
                      },
                      "post_id":post.post_id,
                      "user_id":state.user.user_id
                  }
            axios.post(`https://mazad-website.herokuapp.com/comments`, userComeent)
            .then(response => {window.location.reload()});
          }}>Submit</button></p>
          </div>
          
          </div>}

      
    </div>




    <div className="modal" >
   <div className="modal-dialog">
      <div className="modal-content p-0">
         <div className="modal-header p-3">
            <h5 className="modal-title">Modal title</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>
         <div className="modal-body text-center p-2 pt-3">
            <p className='error_text'>Modal body text goes here.</p>
         </div>
         <div className="modal-footer p-1">
            <button type="button" className="btn btn-secondary close_btn" data-bs-dismiss="modal">Close</button>
         </div>
      </div>
   </div>
</div>



    </>
  );
}

export default Auctions;
