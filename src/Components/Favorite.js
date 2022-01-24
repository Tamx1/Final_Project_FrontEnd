import '../App.css';
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
import { useSelector } from "react-redux";



function Favorite() {

    const [favorite, setFavorite] = useState();


  const state = useSelector((state) => {
    return {
      user: state.userReducer.user,
      token: state.userReducer.token,
    };
  });



  useEffect(()=>{
    axios.all([
        axios.get(`https://mazad-website.herokuapp.com/favorite/${state.user.user_id}`)
      ])
      .then(r => {
        setFavorite(r[0].data);
         });
  },[]);

  return (
<div>{favorite === undefined ? '' :
  favorite.length === 0 ? 

  <header className=" py-5">
    <div className="container px-5">
      <div className="row gx-5 justify-content-center">
            <div className="col-lg-6">
                <div className="text-center my-5">
                    <h1 className="display-6 fw-bolder mb-2">Your favorite is empty</h1>
                    <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                    </div>
                </div>
            </div>
        </div>
    </div>
</header> :
<div className="container_Favorite">

        {favorite.map((element, index) => {
            return(
       
        <div className="row" key={index}>
            <div className="col-md-3x">
                <div className="card-sl">
                    <div className="card-image">
                        <img height="200px" width="100%"
                            src={element.post.images} />
                    </div>

                    <a className="card-action" href="#" onClick={()=>{
                         axios.all([
                        axios.delete(`https://mazad-website.herokuapp.com/favorite/${element.favorite_id}`)
                    ])
                    .then(r => {axios.all([
            axios.get(`https://mazad-website.herokuapp.com/favorite/${state.user.user_id}`)
          ])
          .then(r => {
            setFavorite(r[0].data);
             });
             });
                    }}><i className="fa fa-heart"></i></a>
                    <div className="card-heading-favorite">
                        {element.post.title}
                    </div>


                    <div className="card-text-favorite">
                    <span className="fa fa-map-marker"></span> <b>{element.post.city}</b>
                    </div>



                    <div className="card-text-favorite">
                    <span className="fa fa-usd"></span> <b>{element.post.price}</b>
                    </div>
                    {element.post.state === "Open" ? <a href={`post/${element.post.post_id}`} className="card-button-open">Open Auction</a> : <a href={`post/${element.post.post_id}`} className="card-button-close">Close Auction</a>}
                    
                </div>
            </div>
        </div>  
 );})}        </div>  


}
    </div>
  );
}

export default Favorite;
