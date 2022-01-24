import '../App.css';
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
import { useSelector } from "react-redux";

function Auctions() {

  const [posts, setPosts] = useState();
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [auctionsState, setAuctionsState] = useState('Open');
  const [postPrice, setpostPrice] = useState();
  const [user, setUser] = useState();
  const [favorite, setFavorite] = useState();


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
     
         axios.all([
            axios.get(`https://mazad-website.herokuapp.com/favorite/${state.user.user_id}`)
          ])
          .then(r => {
            setFavorite(r[0].data);
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

const cheekUser =(post_id)=>{
  for(let i = 0 ; i < price.length ;i++){
    if(post_id === price[i].post.post_id){
      if(price[i].user.user_id === state.user.user_id)
      return 1
    }
  }
  return 0
  }

  const cheekFavorite =(post_id)=>{
   for(let i = 0 ; i < favorite.length ;i++){
     if(post_id === favorite[i].post.post_id){
       if(favorite[i].user.user_id === state.user.user_id)
       return favorite[i].favorite_id;
     }
   }
   return -1
   }


  return (
<>
{/* ----------------------Search------------------------------- */}
<div className='bg-darkk py-5 '>
<div className=" mt-5 m-lg-5 ">
   <input type="text" className="form-control Text_search" id="inputAddress" placeholder="Search by auction name" onChange={(e)=>{setSearch(e.target.value);}}/>
</div>
<div className=' container_Auctions_Search '>
   <div className="form-group">
      <label htmlFor="inputState" className='Search_label text-white'>City</label>
      <select defaultValue="" id="inputState" className="form-control Text_search" onChange={(e)=>
         {setCity(e.target.value);}}>
         <option value="" disabled >Choose Mazad City</option>
         <option value='Al Bukayriyah'>Al Bukayriyah</option>
         <option value='Riyadh'>Riyadh</option>
         <option value='Abha'>Abha</option>
         <option value='Buraydah'>Buraydah</option>
         <option value='Dammam'>Dammam </option>
         <option value='Jeddah'>Jeddah</option>
         <option value='Al Majma’ah'>Al Majma’ah</option>
         <option value='Mecca'>Mecca</option>
         <option value='Medina'>Medina</option>
         <option value='Qadeimah'>Qadeimah</option>
      </select>
   </div>
   <div className="form-group ">
      <label htmlFor="inputState" className='Search_label text-white'>Mazad Type</label>
      <select defaultValue=""  id="inputState" className="form-control Text_search" onClick={(e)=>
         {setType(e.target.value)}}>
         <option value="" disabled>Choose Mazad Type</option>
         <option value='Cars'>Cars</option>
         <option value='Estate'>Estate</option>
         <option value='Houses'>Houses</option>
      </select>
   </div>
</div>

</div>
{/* ----------------------Search------------------------------- */}

{/* ----------------------Nav------------------------------------- */}

<div className="container_Auctions_Nav ">
  <div className="row">
    <button className="col-sm  Auctions_Nav_btn1" id='Auctions_Nav_btn1' onClick={()=>{setAuctionsState('Open')
    document.querySelector("#Auctions_Nav_btn1").style = "background-color: #f2e9e4; color: black;";
    document.querySelector("#Auctions_Nav_btn2").style = "background-color: #22223b; color: white;";
    document.querySelector("#Auctions_Nav_btn3").style = "background-color: #22223b; color: white;";
    
    
    }}>Open auctions</button><button className="col-sm  Auctions_Nav_btn2" id='Auctions_Nav_btn2' onClick={()=>{setAuctionsState('Close')
    document.querySelector("#Auctions_Nav_btn2").style = "background-color: #f2e9e4; color: black;";
    document.querySelector("#Auctions_Nav_btn1").style = "background-color: #22223b; color: white;";
    document.querySelector("#Auctions_Nav_btn3").style = "background-color: #22223b; color: white;";}}>
    Closed auctions
    </button>
    <button className="col-sm  Auctions_Nav_btn3 text-light" id='Auctions_Nav_btn3' onClick={()=>{
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
   }else{
       window.location = "/add_post"}}}>
    Add new auction
    </button>
  </div>
</div>

{/* ----------------------Nav------------------------------------- */}



<div className='container container_Auctions'>
   {  posts === undefined ? '' :
   posts.map((element, index) => {
   if((element.state == auctionsState) && ( element.title.startsWith(search)  || search === '') && (city === element.city || city === '') && (type === element.post_type || type === '') ){
   if(auctionsState === 'Close'){
      return(
         <section className="main-content" key={index}>
      <div className="container">
         <div className="row">
            <div className="cols-sm-6 cols-md-6 cols-lg-6">
               <div className="food-card food-card--vertical">


               {favorite !== undefined && cheekFavorite(element.post_id) !== -1?                   
               <div className="food-card_img">
                     <img src={element.images} alt="" />
                     <a href="#" onClick={()=>{
                         axios.all([
                        axios.delete(`https://mazad-website.herokuapp.com/favorite/${cheekFavorite(element.post_id)}`)
                    ])
                    .then(r => {axios.all([
                       
            axios.get(`https://mazad-website.herokuapp.com/favorite/${state.user.user_id}`)])
          .then(res => {
            setFavorite(res[0].data);
            console.log(res)
             });
             });
                    }}><i className="fa fa-heart-o i-img"></i></a>
                  </div> : 
                  <div className="food-card_img">
                     <img src={element.images} alt="" />
                     <a href="#" onClick={()=>{
                        const favorite = {
                           "favorite":{},
                           "post_id":element.post_id,
                           "user_id":state.user.user_id
                        } 
                  axios.post(`https://mazad-website.herokuapp.com/favorite`, favorite)
                                          .then(response => {

                                          });


                     }}><i className="fa fa-heart-o"></i></a>
                  </div>}



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
                        <hr/>
                        <div className="space-between">
                           <div className="food-card_price mr-5">
                              <span>{getPostPrice(element.post_id)}$</span>
                           </div>
                           <div className="food-card_order-count">
                              <div className="input-group mb-3">
                                 <input type="number" className="form-control input-manulator" placeholder={getPostPrice(element.post_id)} disabled/>
                                 <div className="input-group-append">
                                    
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>
   
      );
   }
   return (
   <section className="main-content" key={index}>
      <div className="container">
         <div className="row">
            <div className="cols-sm-6 cols-md-6 cols-lg-6">
               <div className="food-card food-card--vertical">
               {favorite !== undefined && cheekFavorite(element.post_id) !== -1?  
                 <div className="food-card_img">
                     <img src={element.images} alt="" />
                     <a href="#" onClick={()=>{
                         axios.all([
                        axios.delete(`https://mazad-website.herokuapp.com/favorite/${cheekFavorite(element.post_id)}`)
                    ])
                    .then(r => {axios.all([
                       
            axios.get(`https://mazad-website.herokuapp.com/favorite/${state.user.user_id}`)])
          .then(res => {
            setFavorite(res[0].data);
            console.log(res)
             });
             });
                    }}><i className="fa fa-heart-o i-img"></i></a>
                  </div> : 
                  <div className="food-card_img">
                     <img src={element.images} alt="" />
                     <a href="#" onClick={()=>{
                        const favorite = {
                           "favorite":{},
                           "post_id":element.post_id,
                           "user_id":state.user.user_id
                        } 
                                          axios.all([
                        axios.post(`https://mazad-website.herokuapp.com/favorite`, favorite)
                    ])
                    .then(r => {axios.all([
                       
            axios.get(`https://mazad-website.herokuapp.com/favorite/${state.user.user_id}`)])
          .then(res => {
            setFavorite(res[0].data);
             });});
                     }}><i className="fa fa-heart-o"></i></a>
                  </div>}
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
                        <hr/>
                        <div className="space-between">
                           <div className="food-card_price mr-5">
                              <span>{getPostPrice(element.post_id)}$</span>
                           </div>
                           <div className="food-card_order-count">
                              <div className="input-group mb-3">
                                 <input type="number" min={getPostPrice(element.post_id)+1} className="form-control input-manulator" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" onChange={(e)=>{
                                 setpostPrice(e.target.value);
                                 }} />
                                 <div className="input-group-append">
                                    <button className="btna btn-outline-secondary add-btn" type="button" id="button-addon1" onClick={()=>{
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
                                    if(postPrice !== undefined && postPrice <= getPostPrice(element.post_id)){
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
                                    if(state.user.user_id === element.user.user_id){
                                    modal.style.display = "block";
                                    document.querySelector('.modal-title').innerHTML = 'Eroor'
                                    document.querySelector('.error_text').innerHTML = 'You cannot bid on your post'
                                    return
                                    }
                                    if(cheekUser(element.post_id) === 1){
                                    modal.style.display = "block";
                                    document.querySelector('.modal-title').innerHTML = 'Eroor'
                                    document.querySelector('.error_text').innerHTML = 'You are the last bidder on this post'
                                    return
                                    }
                                    axios.all([axios.get(`https://mazad-website.herokuapp.com/post_price/${element.post_id}`)
                                    ])
                                    .then( r => {
                                    const userId = r[0].data.user.user_id;
                                    axios.all([
                                    axios.get(`https://mazad-website.herokuapp.com/users/${userId}`)
                                    ])
                                    .then(res => {
                                    const userInfo = r[0].data.user;
                                    userInfo.balance = parseInt(userInfo.balance)+ parseInt(getPostPrice(element.post_id));
                                    axios.put(`https://mazad-website.herokuapp.com/users/${userInfo.user_id}`,userInfo)
                                    .then(response => {});
                                    });
                                    });
                                    const updatePostPrice = {
                                    "price": postPrice,
                                    "user": user,
                                    }
                                    axios.put(`https://mazad-website.herokuapp.com/post_price/${element.post_id}`,updatePostPrice)
                                    .then(response => {});
                                    user.balance =parseInt(user.balance) - parseInt(postPrice);
                                    axios.put(`https://mazad-website.herokuapp.com/users/${user.user_id}`,user)
                                    .then(response => {});
                                    setpostPrice(undefined)
                                    // Get the modal
                                    }}><i className="fa fa-plus"></i></button>
                                 </div>
                              </div>
                           </div>
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
