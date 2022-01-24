import '../App.css';
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
import { useSelector } from "react-redux";


function AddPost() {

  const [title, settitle] = useState('');
  const [city, setCity] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [img, setImg] = useState('');
  const [user, setUser] = useState('');
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
      }

        },[]);

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
  setImg(file.url);
  setLoding(false)

}
  return (<>


<div className="container-addPost add-post-text">
	<div>
	    
	    <div className="">
	        
    		<h1 className='display-6 fw-bolder text-center mb-2 add-post-text'>Create post</h1>
    		
    		    
    		    <div className="form-group has-error">
    		        <label htmlFor="slug">Title</label>
    		        <input type="text" className="form-control" name="slug" onChange={(e)=>{
                  settitle(e.target.value);
                }}/>
    		    </div>
    		    
    		    <div className="form-group">
    		        <label htmlFor="title">City </label>
                <select defaultValue="" id="inputState" className="form-control" onChange={(e)=>{
                  setCity(e.target.value);
                }}>
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

            <div className="form-group">
    		        <label htmlFor="title">Mazad Type</label>
                <select defaultValue=""  id="inputState" className="form-control" onChange={(e)=>{
                  setType(e.target.value);
                }}>
         <option value="" disabled>Choose Mazad Type</option>
         <option value='Cars'>Cars</option>
         <option value='Estate'>Estate</option>
         <option value='Houses'>Houses</option>
      </select>
    		    </div>
    		    
    		    <div className="form-group has-error">
    		        <label htmlFor="slug">Price</label>
    		        <input type="number" className="form-control" name="slug" onChange={(e)=>{
                  setPrice(e.target.value);
                }}/>
    		    </div>


    		    <div className="form-group">
    		        <label htmlFor="description">Description</label>
    		        <textarea rows="5" className="form-control" name="description" onChange={(e)=>{
                  setDescription(e.target.value);
                }}></textarea>
    		    </div>
            <label htmlFor="formFileSm" className="form-label">Picture 
            </label>
            {img === '' ? '' :<div className='wrapper-add-post'> <img src={img} height="50%"/><br></br> </div>}

            {loding ?  <div className='text-center'>     <br></br>    <div className="spinner-border text-secondary" role="status">
              <span className="sr-only text-center">Loading...</span>
            </div> <br></br>  </div>  :<>
            <input className="form-control mb-4" type="file" id="formFileMultiple" accept="image/png, image/gif, image/jpeg" multiple onChange={(e)=>{
                  uploadImg(e);
                }} />  


    		    
    		    <div className="form-group text-center">
    		        <button type="button" className="btn btn-primary" onClick={()=>{
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
                  const post = {
                            "post":
                            {
                                "title":title,
                                "city":city,
                                "content":description,
                                "images":img,
                                "post_type":type,
                                "price":price
                            },
                            "user_id":user.user_id
                        }
                        axios.post(`https://mazad-website.herokuapp.com/posts`, post)
                          .then(response => {
                            if(response.data !== 'ok'){
                                    modal.style.display = "block";
                                    document.querySelector('.modal-title').innerHTML = 'Eroor'
                                    document.querySelector('.error_text').innerHTML = response.data
                                    return
                            }else{   window.location = "/auctions"}
                          });
                             
                            }}>
    		            Create
    		        </button>

    		    </div>
    		    </>}
		</div>
		
	</div>
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
  </>);
}

export default AddPost;
